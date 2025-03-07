using ContosoRealEstate.BusinessLogic.Models;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Extensions;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Globalization;
using System.Linq;

namespace ContosoRealEstateBusinessLogic
{
    /// <summary>
    /// Plugin development guide: https://docs.microsoft.com/powerapps/developer/common-data-service/plug-ins
    /// Best practices and guidance: https://docs.microsoft.com/powerapps/developer/common-data-service/best-practices/business-logic/
    /// </summary>
    public class ReservationOnCreatePreOperation : PluginBase
    {

        public ReservationOnCreatePreOperation() : base(typeof(ReservationOnCreatePreOperation))
        {

        }

        // Entry point for custom business logic execution
        protected override void ExecuteDataversePlugin(ILocalPluginContext localPluginContext)
        {
            if (localPluginContext == null)
            {
                throw new ArgumentNullException(nameof(localPluginContext));
            }

            var service = localPluginContext.OrgSvcFactory.CreateOrganizationService(null);
            contoso_Reservation reservation = ((Entity)localPluginContext.PluginExecutionContext.InputParameters["Target"]).ToEntity<contoso_Reservation>();
            try
            {
                // Lock the listing to prevent multiple reservations at the same time
                service.Update(new contoso_listing
                {
                    Id = reservation.contoso_Listing.Id,
                    contoso_Lock = Guid.NewGuid().ToString()
                }.ToEntity<Entity>());

                // check if the listing is available
                var query = new QueryExpression()
                {
                    EntityName = contoso_Reservation.EntityLogicalName,
                    ColumnSet = new ColumnSet(contoso_Reservation.Fields.contoso_ReservationId)
                };
                query.Criteria.AddCondition(contoso_Reservation.Fields.contoso_Listing, ConditionOperator.Equal, reservation.contoso_Listing.Id);
                query.Criteria.AddCondition(contoso_Reservation.Fields.contoso_ReservationStatus, ConditionOperator.NotEqual, (int)contoso_reservationstatus.Cancelled);
                query.Criteria.AddCondition(contoso_Reservation.Fields.contoso_From, ConditionOperator.LessThan, reservation.contoso_To.Value);
                query.Criteria.AddCondition(contoso_Reservation.Fields.contoso_To, ConditionOperator.GreaterThan, reservation.contoso_From.Value);

                var reservations = service.RetrieveMultiple(query);
                localPluginContext.Trace($"Query returned {reservations.Entities.Count} results for {reservation.contoso_From.Value} {reservation.contoso_To.Value}" );
                var isListingAvailable = reservations.Entities.FirstOrDefault() == null;

                if (!isListingAvailable)
                {
                    throw new ListingUnavailableOnDatesException("The listing is not available for these dates.");
                }
                localPluginContext.Trace("Listing is available");

                // Validate that the To is after the from date
                if (reservation.contoso_To < reservation.contoso_From)
                {
                    throw new InvalidPluginExecutionException("The To date must be after the From date.");
                }

                localPluginContext.Trace("Reservation dates are valid");

                // Set the name if not already set
                contoso_listing listing = service.Retrieve(
                    contoso_listing.EntityLogicalName,
                    reservation.contoso_Listing.Id,
                    new ColumnSet(contoso_listing.Fields.contoso_name))
                    .ToEntity<contoso_listing>();

                if (string.IsNullOrEmpty(reservation.contoso_Name))
                {
                    localPluginContext.Trace("Setting Name");
                    reservation.contoso_Name = $"{listing.contoso_name} - {reservation.contoso_From} - {reservation.contoso_To}";
                }
            }
            catch (Exception ex)
            {
                throw new InvalidPluginExecutionException(ex.Message, ex);
            }
        }
    }
}
