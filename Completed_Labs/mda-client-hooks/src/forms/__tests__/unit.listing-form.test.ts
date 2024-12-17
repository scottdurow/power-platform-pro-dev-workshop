import { contoso_listingAttributes } from '../../dataverse-gen/entities/contoso_listing';
import { contoso_listing_contoso_listing_contoso_features } from '../../dataverse-gen/enums/contoso_listing_contoso_listing_contoso_features';
import { OnLoad } from '../listing-form';
import { XrmMockGenerator } from 'xrm-mock';

describe('OnLoad', () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
  });

  it('should execute the OnLoad function', async () => {
    // Mock the Xrm.Events.EventContext object
    const context = XrmMockGenerator.getEventContext();
    const featuresMock = XrmMockGenerator.Attribute.createOptionSet(
      'contoso_features',
      [
        contoso_listing_contoso_listing_contoso_features.Parking,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any,
    );
    const totalParkingSpacesMock = XrmMockGenerator.Attribute.createNumber(
      contoso_listingAttributes.contoso_TotalParkingSpaces,
      0,
    );

    // Mock formContext.data.entity.getEntityName() to return 'contoso_listing'
    context.getFormContext().data.entity.getEntityName = jest.fn(
      () => 'contoso_listing',
    );

    // Call the OnLoad function
    await OnLoad(context);

    // Check that totalParkingSpacesMock.setVisible was called
    expect(totalParkingSpacesMock.controls.get(0).getVisible()).toBe(true);

    // Set the featuresMock to be empty
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    featuresMock.setValue([] as any);

    // Call the OnLoad function
    await OnLoad(context);

    // Check that totalParkingSpacesMock.setVisible was called
    expect(totalParkingSpacesMock.controls.get(0).getVisible()).toBe(false);
  });
});
