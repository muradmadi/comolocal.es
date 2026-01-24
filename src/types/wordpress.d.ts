// Basic Image Node
export interface FeaturedImageNode {
    sourceUrl: string;
    altText: string;
}

export interface FeaturedImage {
    node: FeaturedImageNode;
}

export interface VenueSchemaData {
    // Scalar fields
    cocktailPrice: number | null;
    googlePlaceId: string;
    officialWebsite: string | null;
    longitudeLatitude: string | null;
    studentDealDetail: string | null;

    // List fields (The API says these are lists, so we type them as arrays)
    currency: string[] | null;
    entryFeeStatus: string[] | null;
    noiseLevel: string[] | null;

    // Flattened Hours
    mondayOpen: string | null;
    mondayClose: string | null;
    tuesdayOpen: string | null;
    tuesdayClose: string | null;
    wednesdayOpen: string | null;
    wednesdayClose: string | null;
    thursdayOpen: string | null;
    thursdayClose: string | null;
    fridayOpen: string | null;
    fridayClose: string | null;
    saturdayOpen: string | null;
    saturdayClose: string | null;
    sundayOpen: string | null;
    sundayClose: string | null;
}

export interface Venue {
    title: string;
    slug: string;
    content?: string;
    featuredImage?: FeaturedImage;
    venueSchemaData: VenueSchemaData;
    neighborhoods?: { nodes: { name: string; slug: string }[] };
    musicGenres?: { nodes: { name: string; slug: string }[] };
    vibeTags?: { nodes: { name: string; slug: string }[] };
}

export interface EventData {
    eventStart: string; // ISO Date String
    eventEnd: string; // ISO Date String
    relatedVenue: { nodes: Venue[] } | null;
}

export interface Event {
    id: string;
    title: string;
    slug: string;
    content: string;
    eventData: EventData;
    featuredImage?: FeaturedImage;
}

export interface ArticleMeta {
    mentionedVenues: Venue[] | null;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    date: string;
    articleMeta: ArticleMeta;
    featuredImage?: FeaturedImage;
}
