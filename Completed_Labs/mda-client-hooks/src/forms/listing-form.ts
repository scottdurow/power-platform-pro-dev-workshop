import {
  contoso_listingAttributes,
  contoso_listingFormContext,
} from '../dataverse-gen/entities/contoso_listing';
import { contoso_listing_contoso_listing_contoso_features } from '../dataverse-gen/enums/contoso_listing_contoso_listing_contoso_features';

export async function OnLoad(context: Xrm.Events.EventContext): Promise<void> {
  const formContext = context.getFormContext();
  console.log('OnLoad hook' + formContext.data.entity.getEntityName());
  formContext
    .getAttribute(contoso_listingAttributes.contoso_features)
    ?.addOnChange(features_onchange);
  // Run the onchange event to show/hide the number of bathrooms field
  features_onchange(context as Xrm.Events.Attribute.ChangeEventContext);
}

function features_onchange(
  context: Xrm.Events.Attribute.ChangeEventContext,
): void {
  const formContext = context.getFormContext() as contoso_listingFormContext;
  console.log('OnLoad hook' + formContext.data.entity.getEntityName());

  // If the choices field contains parking, then enable the total parking spaces field
  const features = formContext
    .getAttribute<Xrm.Attributes.MultiSelectOptionSetAttribute>(
      contoso_listingAttributes.contoso_features,
    )
    .getValue();

  if (
    features &&
    features.includes(contoso_listing_contoso_listing_contoso_features.Parking)
  ) {
    formContext
      .getControl(contoso_listingAttributes.contoso_TotalParkingSpaces)
      .setVisible(true);
  } else {
    formContext
      .getControl(contoso_listingAttributes.contoso_TotalParkingSpaces)
      .setVisible(false);
    formContext
      .getAttribute(contoso_listingAttributes.contoso_TotalParkingSpaces)
      .setValue(null);
  }
}
