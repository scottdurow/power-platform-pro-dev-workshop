using ContosoRealEstate.BusinessLogic.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Moq;
using System;
using System.ComponentModel.Design;

namespace ContosoRealEstateBusinessLogic.Tests
{
    [TestClass]
    public class ReservationCreateUnitTests : ReservationOnCreatePreOperation
    {

        [TestMethod]
        public void ExecuteDataversePlugin_ShouldThrowException_WhenAlreadyReserved()
        {
            // Arrange           
            var target = new Entity(contoso_Reservation.EntityLogicalName)
            {
                Id = Guid.NewGuid()
            };

            target[contoso_Reservation.Fields.contoso_From] = DateTime.Now;
            target[contoso_Reservation.Fields.contoso_To] = DateTime.Now.AddDays(1);
            target[contoso_Reservation.Fields.contoso_Listing] = new EntityReference(contoso_listing.EntityLogicalName, Guid.NewGuid());

            // Mock the OrganizationService
            var mockOrganizationService = new Mock<IOrganizationService>();
            var mockOrganizationServiceFactory = new Mock<IOrganizationServiceFactory>();
            mockOrganizationServiceFactory.Setup(x => x.CreateOrganizationService(It.IsAny<Guid?>())).Returns(mockOrganizationService.Object);

            // Mock the tracing service
            var mockTraceService = new Mock<ITracingService>().Object;

            // Mock the Execution Context
            var mockLocalPluginContext = new Mock<ILocalPluginContext>();
            var mockPluginExecutionContext = new Mock<IPluginExecutionContext>();
            mockLocalPluginContext.Setup(context => context.PluginExecutionContext)
                    .Returns(mockPluginExecutionContext.Object);

            mockLocalPluginContext.Setup(context => context.PluginExecutionContext.OutputParameters)
                .Returns(new ParameterCollection());
            mockLocalPluginContext.Setup(context => context.PluginExecutionContext.InputParameters)
                .Returns(new ParameterCollection());

            mockLocalPluginContext.Setup(context => context.PluginExecutionContext.MessageName).Returns("Create");
            mockLocalPluginContext.Setup(context => context.PluginExecutionContext.Stage).Returns(20); // PreOperation
            mockLocalPluginContext.Setup(context => context.PluginExecutionContext.InputParameters).Returns(new ParameterCollection());
            mockLocalPluginContext.Setup(context => context.TracingService).Returns(mockTraceService);
            mockLocalPluginContext.Setup(context => context.OrgSvcFactory).Returns(mockOrganizationServiceFactory.Object);

            var inputParameters = mockLocalPluginContext.Object.PluginExecutionContext.InputParameters;
            inputParameters["Target"] = target;

            mockOrganizationService.Setup(x => x.RetrieveMultiple(It.IsAny<QueryExpression>()))
               .Returns(
                    // Simulate a match to the query
                    new EntityCollection(new contoso_Reservation[] { new contoso_Reservation() })
               );

            mockOrganizationService.Setup(x => x.Retrieve(It.IsAny<string>(), It.IsAny<Guid>(), It.IsAny<ColumnSet>()))
                .Returns(new contoso_listing { contoso_name = "Listing Name" });

            // Act
            void executePlugin() => new ReservationCreateUnitTests().ExecuteDataversePlugin(mockLocalPluginContext.Object);

            // Assert
            var expectedException = Assert.ThrowsException<InvalidPluginExecutionException>(executePlugin);
            Assert.IsInstanceOfType(expectedException.InnerException, typeof(ListingUnavailableOnDatesException));
        }
    }
}
