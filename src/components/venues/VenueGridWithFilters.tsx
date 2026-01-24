import React, { useState, useMemo } from 'react';
import VenueFilterRail, { type ActiveFilters } from './VenueFilterRail';
import { getNoiseLevelLabel, getEntryFeeLabel, matchesEntryFee, matchesNoiseLevel, PRICE_RANGES, ENTRY_FEES } from '../../lib/venue-mapping';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// Helper to capitalize first letter
function capitalizeFirstLetter(string: string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface VenueSchemaData {
    cocktailPrice: number | null;
    currency: string[] | null;
    entryFeeStatus: string[] | null;
    noiseLevel: string[] | null;
    studentDealDetail: string | null;
    officialWebsite: string | null;
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

interface VenueData {
    title: string;
    slug: string;
    content?: string;
    featuredImage?: {
        node: {
            sourceUrl: string;
            altText: string;
        };
    };
    venueSchemaData: VenueSchemaData;
    neighborhoods?: { nodes: { name: string; slug: string }[] };
    vibeTags?: { nodes: { name: string; slug: string }[] };
}

interface VenueGridWithFiltersProps {
    venues: VenueData[];
}

// Helper to get today's hours
function getTodayHours(schema: VenueSchemaData): { open: string | null; close: string | null; dayName: string } {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];

    const hoursMap: Record<string, { open: string | null; close: string | null }> = {
        monday: { open: schema.mondayOpen, close: schema.mondayClose },
        tuesday: { open: schema.tuesdayOpen, close: schema.tuesdayClose },
        wednesday: { open: schema.wednesdayOpen, close: schema.wednesdayClose },
        thursday: { open: schema.thursdayOpen, close: schema.thursdayClose },
        friday: { open: schema.fridayOpen, close: schema.fridayClose },
        saturday: { open: schema.saturdayOpen, close: schema.saturdayClose },
        sunday: { open: schema.sundayOpen, close: schema.sundayClose },
    };

    return { ...hoursMap[today], dayName: today.charAt(0).toUpperCase() + today.slice(1) };
}

// Helper to strip HTML and truncate
function stripHtml(html: string | undefined, maxLength: number = 150): string {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
    return text.length > maxLength ? text.substring(0, maxLength).trim() + '...' : text;
}

// Icon components
const ClockIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const VolumeIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
);

const TicketIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
    </svg>
);

const BeerIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.628.105a9.128 9.128 0 01-4.264-.192M5 14.5l-1.402 1.402c-1.232 1.232-.65 3.318 1.067 3.611l.628.105a9.128 9.128 0 004.264-.192" />
    </svg>
);

const SparkleIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
);

// Venue Card Component
function VenueCard({ venue }: { venue: VenueData }) {
    const schema = venue.venueSchemaData;
    const todayHours = getTodayHours(schema);
    const isOpen = todayHours.open && todayHours.close;
    const description = stripHtml(venue.content);

    const normalizedStatus = getEntryFeeLabel(schema.entryFeeStatus?.[0]);
    const showBadge = matchesEntryFee(schema.entryFeeStatus?.[0], ENTRY_FEES.FREE.id);
    const displayNoise = getNoiseLevelLabel(schema.noiseLevel?.[0]);

    return (
        <article className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
            {/* Image Section */}
            <div className="relative w-full md:w-72 lg:w-80 h-56 md:h-auto flex-shrink-0 overflow-hidden">
                {venue.featuredImage?.node?.sourceUrl ? (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 md:bg-gradient-to-r" />
                        <img
                            src={venue.featuredImage.node.sourceUrl}
                            alt={venue.featuredImage.node.altText || venue.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                        <span>No Image</span>
                    </div>
                )}

                {/* Price Badge - Overlay on image */}
                <div className="absolute top-3 left-3 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-white/10 shadow-lg">
                        <BeerIcon />
                        <span className="text-sm font-bold text-foreground">
                            €{schema.cocktailPrice || '?'}
                        </span>
                    </div>
                </div>


            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col p-5 md:p-6">
                {/* Header */}
                <div className="mb-3">
                    <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                        {venue.title}
                    </h3>
                    {venue.neighborhoods?.nodes?.[0] && (
                        <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
                            {venue.neighborhoods.nodes[0].name}
                        </p>
                    )}
                    {description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                    )}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Today's Hours */}
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/30 border border-border/30">
                        <div className={cn(
                            "mt-0.5",
                            isOpen ? "text-green-400" : "text-muted-foreground"
                        )}>
                            <ClockIcon />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">{todayHours.dayName}</p>
                            <p className={cn(
                                "text-sm font-semibold",
                                isOpen ? "text-foreground" : "text-muted-foreground"
                            )}>
                                {isOpen ? `${todayHours.open} - ${todayHours.close}` : 'Closed'}
                            </p>
                        </div>
                    </div>

                    {/* Noise Level */}
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/30 border border-border/30">
                        <div className="text-accent mt-0.5">
                            <VolumeIcon />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Noise Level</p>
                            <p className="text-sm font-semibold text-foreground truncate">
                                {displayNoise}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Student Deal - if available */}
                {schema.studentDealDetail && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                        <div className="text-primary mt-0.5">
                            <SparkleIcon />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-primary font-semibold uppercase tracking-wide">Student Deal</p>
                            <p className="text-sm text-foreground">{schema.studentDealDetail}</p>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-4 pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-xs text-muted-foreground/60 italic">Check details inside</span>
                    </div>

                    <a href={`/venues/${venue.slug}`} className="flex-shrink-0">
                        <Button className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            View Details
                            <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Button>
                    </a>
                </div>
            </div>
        </article>
    );
}

export default function VenueGridWithFilters({ venues }: VenueGridWithFiltersProps) {
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        entryFee: null,
        noiseLevel: null,
        priceRange: null,
        neighborhood: null,
    });

    // Derive neighborhood options from available venues
    const neighborhoodOptions = useMemo(() => {
        const map = new Map<string, string>();
        venues.forEach(venue => {
            venue.neighborhoods?.nodes?.forEach(node => {
                map.set(node.slug, node.name);
            });
        });

        return Array.from(map.entries())
            .map(([value, label]) => ({ value, label }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [venues]);

    // Initialize from URL params on mount
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const entry = params.get('entry');
        const noise = params.get('noise');
        const price = params.get('price');
        const neighborhood = params.get('neighborhood');

        if (entry || noise || price || neighborhood) {
            setActiveFilters(prev => ({
                ...prev,
                entryFee: entry || prev.entryFee,
                noiseLevel: noise || prev.noiseLevel,
                priceRange: price || prev.priceRange,
                neighborhood: neighborhood || prev.neighborhood
            }));
        }
    }, []);

    const filteredVenues = useMemo(() => {
        return filterVenues(venues, activeFilters);
    }, [venues, activeFilters]);

    return (
        <div className="space-y-10">
            {/* Filter Rail */}
            <VenueFilterRail
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                venueCount={venues.length}
                filteredCount={filteredVenues.length}
                neighborhoodOptions={neighborhoodOptions}
            />

            {/* Venues Grid - 2 columns on large screens */}
            {filteredVenues.length === 0 ? (
                <div className="text-center p-12 bg-muted/20 rounded-xl border border-dashed border-border">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <p className="text-lg text-muted-foreground mb-2">No venues match your filters</p>
                        <p className="text-sm text-muted-foreground">
                            Try adjusting your filters to discover more spots
                        </p>
                        <button
                            onClick={() => setActiveFilters({ entryFee: null, noiseLevel: null, priceRange: null, neighborhood: null })}
                            className="mt-4 text-sm text-primary hover:text-primary/80 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredVenues.map((venue: VenueData) => (
                        <VenueCard key={venue.slug} venue={venue} />
                    ))}
                </div>
            )}
        </div>
    );
}

// Helper function to filter venues based on active filters
export function filterVenues(venues: any[], filters: ActiveFilters): any[] {
    return venues.filter((venue) => {
        const schema = venue.venueSchemaData || {};

        // Neighborhood filter
        if (filters.neighborhood) {
            const hasNeighborhood = venue.neighborhoods?.nodes?.some(
                (n: { slug: string }) => n.slug === filters.neighborhood
            );
            if (!hasNeighborhood) return false;
        }

        // Entry fee filter
        if (filters.entryFee) {
            const entryStatus = schema.entryFeeStatus?.[0];
            if (!matchesEntryFee(entryStatus, filters.entryFee)) return false;
        }

        // Noise level filter
        if (filters.noiseLevel) {
            const noise = schema.noiseLevel?.[0];
            if (!matchesNoiseLevel(noise, filters.noiseLevel)) return false;
        }

        // Price range filter (based on cocktail price)
        if (filters.priceRange && schema.cocktailPrice !== null) {
            const price = schema.cocktailPrice;
            if (filters.priceRange === PRICE_RANGES.BUDGET.id && price >= PRICE_RANGES.BUDGET.max) return false;
            // Mid range is between budget max (10) and mid max (15).
            if (filters.priceRange === PRICE_RANGES.MID.id && (price < PRICE_RANGES.MID.min || price > PRICE_RANGES.MID.max)) return false;
            if (filters.priceRange === PRICE_RANGES.PREMIUM.id && price <= PRICE_RANGES.PREMIUM.min) return false;
        }

        return true;
    });
}
