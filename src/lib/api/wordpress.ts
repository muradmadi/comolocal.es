
export async function wpQuery({ query, variables = {} }: { query: string; variables?: Record<string, any> }) {
  const API_URL = import.meta.env.WORDPRESS_API_URL;



  if (!API_URL) {
    console.error("WORDPRESS_API_URL is not defined in environment variables");
    throw new Error("WORDPRESS_API_URL is not defined in environment variables");
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });



    if (!res.ok) {
      console.error(`Failed to fetch from WordPress API: ${res.statusText}`);
      return null;
    }

    const json = await res.json();


    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('WordPress API fetch error:', error);
    return null;
  }
}

export async function getAllVenues() {
  const data = await wpQuery({
    query: `
      query GetAllVenues {
        venues(first: 100) {
          nodes {
            slug
            title
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            venueSchemaData {
               googlePlaceId
               longitudeLatitude
               cocktailPrice
               currency
               entryFeeStatus
               noiseLevel
               studentDealDetail
               officialWebsite
               mondayOpen
               mondayClose
               tuesdayOpen
               tuesdayClose
               wednesdayOpen
               wednesdayClose
               thursdayOpen
               thursdayClose
               fridayOpen
               fridayClose
               saturdayOpen
               saturdayClose
               sundayOpen
               sundayClose
            }
            neighborhoods {
              nodes {
                name
                slug
              }
            }
            musicGenres {
              nodes {
                name
                slug
              }
            }
            vibeTags {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `,
  });

  return data?.venues?.nodes || [];
}

export async function getVenueBySlug(slug: string) {
  const data = await wpQuery({
    query: `
          query GetVenue($slug: ID!) {
            venue(id: $slug, idType: SLUG) {
              slug
              title
              content
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
              venueSchemaData {
                cocktailPrice
                currency
                entryFeeStatus
                noiseLevel
                googlePlaceId
                officialWebsite
                studentDealDetail
                mondayOpen
                mondayClose
                tuesdayOpen
                tuesdayClose
                wednesdayOpen
                wednesdayClose
                thursdayOpen
                thursdayClose
                fridayOpen
                fridayClose
                saturdayOpen
                saturdayClose
                sundayOpen
                sundayClose
              }
              neighborhoods {
                nodes {
                  name
                  slug
                }
              }
              musicGenres {
                nodes {
                  name
                  slug
                }
              }
              vibeTags {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        `,
    variables: { slug }
  });

  return data?.venue;
}

export async function getAllEvents() {
  const data = await wpQuery({
    query: `
        query GetAllEvents {
            events(first: 100) {
            nodes {
                id
                title
                slug
                content
                eventData {
                    eventStart
                    eventEnd
                    relatedVenue {
                        nodes {
                            ... on Venue {
                                title
                                slug
                            }
                        }
                    }
                }
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
            }
            }
        }
        `
  });

  return data?.events?.nodes || [];
}

export async function getPostBySlug(slug: string) {
  const data = await wpQuery({
    query: `
        query GetPost($slug: ID!) {
            post(id: $slug, idType: SLUG) {
                id
                title
                content
                date
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
                articleMeta {
                    mentionedVenues {
                        ... on Venue {
                            title
                            slug
                            featuredImage {
                                node {
                                    sourceUrl
                                    altText
                                }
                            }
                            venueSchemaData {
                                cocktailPrice
                                currency
                                entryFeeStatus
                                noiseLevel
                            }
                        }
                    }
                }
            }
        }
        `,
    variables: { slug }
  });

  return data?.post;
}

export async function getAllPosts() {
  const data = await wpQuery({
    query: `
        query GetAllPosts {
            posts(first: 100) {
                nodes {
                    id
                    title
                    slug
                    excerpt
                    date
                    featuredImage {
                        node {
                            sourceUrl
                            altText
                        }
                    }
                    categories {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
        `
  });

  return data?.posts?.nodes || [];
}

export async function getAllTaxonomies() {
  const data = await wpQuery({
    query: `
            query GetAllTaxonomies {
                neighborhoods(first: 20) {
                    nodes {
                        name
                        slug
                        count
                    }
                }
                musicGenres(first: 20) {
                    nodes {
                        name
                        slug
                        count
                    }
                }
                vibeTags(first: 20) {
                    nodes {
                        name
                        slug
                        count
                    }
                }
            }
        `
  });

  return {
    neighborhoods: data?.neighborhoods?.nodes || [],
    musicGenres: data?.musicGenres?.nodes || [],
    vibeTags: data?.vibeTags?.nodes || []
  };
}
