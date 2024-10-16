/* eslint-disable*/

// Entity contoso_listing FormContext
export interface contoso_listingFormContext extends Xrm.FormContext {
    getAttribute(): Xrm.Attributes.Attribute[];
    getAttribute<T extends Xrm.Attributes.Attribute>(attributeName: string): T;
    getAttribute(attributeName: string): Xrm.Attributes.Attribute;
    getAttribute(index: number): Xrm.Attributes.Attribute;

    getControl(): Xrm.Controls.Control[];
    getControl<T extends Xrm.Controls.Control>(controlName: string): T;
    getControl(controlName: string): Xrm.Controls.Control;
    getControl(index: number): Xrm.Controls.Control;

    /*
    
    */
    getAttribute(name: 'contoso_address'): Xrm.Attributes.StringAttribute;
    /*
    
    */
    getControl(name: 'contoso_address'): Xrm.Controls.StringControl;
    /*
    
    */
    getAttribute(name: 'contoso_description'): Xrm.Attributes.StringAttribute;
    /*
    
    */
    getControl(name: 'contoso_description'): Xrm.Controls.StringControl;
    /*
    
    */
    getAttribute(name: 'contoso_displayname'): Xrm.Attributes.StringAttribute;
    /*
    
    */
    getControl(name: 'contoso_displayname'): Xrm.Controls.StringControl;
    /*
    
    */
    getAttribute(name: 'contoso_features'): Xrm.Attributes.OptionSetAttribute;
    /*
    
    */
    getControl(name: 'contoso_features'): Xrm.Controls.OptionSetControl;
    /*
    
    */
    getAttribute(name: 'contoso_listingid1'): Xrm.Attributes.StringAttribute;
    /*
    
    */
    getControl(name: 'contoso_listingid1'): Xrm.Controls.StringControl;
    /*
    
    */
    getAttribute(name: 'contoso_lock'): Xrm.Attributes.StringAttribute;
    /*
    
    */
    getControl(name: 'contoso_lock'): Xrm.Controls.StringControl;
    /*
    Maximum guests that the property can accommodate
    */
    getAttribute(name: 'contoso_maximumguests'): Xrm.Attributes.NumberAttribute;
    /*
    Maximum guests that the property can accommodate
    */
    getControl(name: 'contoso_maximumguests'): Xrm.Controls.NumberControl;
    /*
    
    */
    getAttribute(name: 'contoso_name'): Xrm.Attributes.StringAttribute;
    /*
    
    */
    getControl(name: 'contoso_name'): Xrm.Controls.StringControl;
    /*
    
    */
    getAttribute(name: 'contoso_numberofbathrooms'): Xrm.Attributes.NumberAttribute;
    /*
    
    */
    getControl(name: 'contoso_numberofbathrooms'): Xrm.Controls.NumberControl;
    /*
    
    */
    getAttribute(name: 'contoso_numberofbedrooms'): Xrm.Attributes.NumberAttribute;
    /*
    
    */
    getControl(name: 'contoso_numberofbedrooms'): Xrm.Controls.NumberControl;
    /*
    
    */
    getAttribute(name: 'contoso_pricepermonth'): Xrm.Attributes.NumberAttribute;
    /*
    
    */
    getControl(name: 'contoso_pricepermonth'): Xrm.Controls.NumberControl;
    /*
    Value of the Price per Month in base currency.
    */
    getAttribute(name: 'contoso_pricepermonth_base'): Xrm.Attributes.NumberAttribute;
    /*
    Value of the Price per Month in base currency.
    */
    getControl(name: 'contoso_pricepermonth_base'): Xrm.Controls.NumberControl;
    /*
    
    */
    getAttribute(name: 'contoso_totalparkingspaces'): Xrm.Attributes.NumberAttribute;
    /*
    
    */
    getControl(name: 'contoso_totalparkingspaces'): Xrm.Controls.NumberControl;
    /*
    Date and time when the record was created.
    */
    getAttribute(name: 'createdon'): Xrm.Attributes.DateAttribute;
    /*
    Date and time when the record was created.
    */
    getControl(name: 'createdon'): Xrm.Controls.DateControl;
    /*
    Exchange rate for the currency associated with the entity with respect to the base currency.
    */
    getAttribute(name: 'exchangerate'): Xrm.Attributes.NumberAttribute;
    /*
    Exchange rate for the currency associated with the entity with respect to the base currency.
    */
    getControl(name: 'exchangerate'): Xrm.Controls.NumberControl;
    /*
    Sequence number of the import that created this record.
    */
    getAttribute(name: 'importsequencenumber'): Xrm.Attributes.NumberAttribute;
    /*
    Sequence number of the import that created this record.
    */
    getControl(name: 'importsequencenumber'): Xrm.Controls.NumberControl;
    /*
    Date and time when the record was modified.
    */
    getAttribute(name: 'modifiedon'): Xrm.Attributes.DateAttribute;
    /*
    Date and time when the record was modified.
    */
    getControl(name: 'modifiedon'): Xrm.Controls.DateControl;
    /*
    Date and time that the record was migrated.
    */
    getAttribute(name: 'overriddencreatedon'): Xrm.Attributes.DateAttribute;
    /*
    Date and time that the record was migrated.
    */
    getControl(name: 'overriddencreatedon'): Xrm.Controls.DateControl;
    /*
    For internal use only.
    */
    getAttribute(name: 'timezoneruleversionnumber'): Xrm.Attributes.NumberAttribute;
    /*
    For internal use only.
    */
    getControl(name: 'timezoneruleversionnumber'): Xrm.Controls.NumberControl;
    /*
    Time zone code that was in use when the record was created.
    */
    getAttribute(name: 'utcconversiontimezonecode'): Xrm.Attributes.NumberAttribute;
    /*
    Time zone code that was in use when the record was created.
    */
    getControl(name: 'utcconversiontimezonecode'): Xrm.Controls.NumberControl;
}
// Entity contoso_listing
export const contoso_listingMetadata = {
  typeName: "mscrm.contoso_listing",
  logicalName: "contoso_listing",
  collectionName: "contoso_listings",
  primaryIdAttribute: "contoso_listingid",
  attributeTypes: {
    // Numeric Types
    contoso_image_timestamp: "BigInt",
    contoso_maximumguests: "Integer",
    contoso_numberofbathrooms: "Integer",
    contoso_numberofbedrooms: "Integer",
    contoso_pricepermonth: "Money",
    contoso_pricepermonth_base: "Money",
    contoso_totalparkingspaces: "Integer",
    exchangerate: "Decimal",
    importsequencenumber: "Integer",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    contoso_features: "MultiSelect",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    contoso_PrimaryImage: ["mscrm.contoso_listingimage"],
    createdby: ["mscrm.systemuser"],
    createdonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    ownerid: ["mscrm.principal"],
    owningbusinessunit: ["mscrm.businessunit"],
    owningteam: ["mscrm.team"],
    owninguser: ["mscrm.systemuser"],
    transactioncurrencyid: ["mscrm.transactioncurrency"],
  },
};

// Attribute constants
export const enum contoso_listingAttributes {
  contoso_address = "contoso_address",
  contoso_description = "contoso_description",
  contoso_displayname = "contoso_displayname",
  contoso_features = "contoso_features",
  contoso_Image = "contoso_image",
  contoso_Image_Timestamp = "contoso_image_timestamp",
  contoso_Image_URL = "contoso_image_url",
  contoso_ImageId = "contoso_imageid",
  contoso_listingId = "contoso_listingid",
  contoso_listingid1 = "contoso_listingid1",
  contoso_Lock = "contoso_lock",
  contoso_MaximumGuests = "contoso_maximumguests",
  contoso_name = "contoso_name",
  contoso_NumberofBathrooms = "contoso_numberofbathrooms",
  contoso_NumberofBedrooms = "contoso_numberofbedrooms",
  contoso_pricepermonth = "contoso_pricepermonth",
  contoso_pricepermonth_Base = "contoso_pricepermonth_base",
  contoso_PrimaryImage = "contoso_primaryimage",
  contoso_PrimaryImageName = "contoso_primaryimagename",
  contoso_Summary = "contoso_summary",
  contoso_TotalParkingSpaces = "contoso_totalparkingspaces",
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ExchangeRate = "exchangerate",
  ImportSequenceNumber = "importsequencenumber",
  ModifiedBy = "modifiedby",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  OverriddenCreatedOn = "overriddencreatedon",
  OwnerId = "ownerid",
  OwnerIdName = "owneridname",
  OwnerIdType = "owneridtype",
  OwnerIdYomiName = "owneridyominame",
  OwningBusinessUnit = "owningbusinessunit",
  OwningBusinessUnitName = "owningbusinessunitname",
  OwningTeam = "owningteam",
  OwningUser = "owninguser",
  statecode = "statecode",
  statuscode = "statuscode",
  TimeZoneRuleVersionNumber = "timezoneruleversionnumber",
  TransactionCurrencyId = "transactioncurrencyid",
  TransactionCurrencyIdName = "transactioncurrencyidname",
  UTCConversionTimeZoneCode = "utcconversiontimezonecode",
  VersionNumber = "versionnumber",
}
