/* eslint-disable*/
import { contoso_listingMetadata } from "./entities/contoso_listing";

export const Entities = {
  contoso_listing: "contoso_listing",
};

// Setup Metadata
// Usage: setMetadataCache(metadataCache);
export const metadataCache = {
  entities: {
    contoso_listing: contoso_listingMetadata,
  },
  actions: {
  }
};