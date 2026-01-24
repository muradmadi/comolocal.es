import React from 'react';
import { cn } from '../../lib/utils';
import {
    NOISE_LEVELS,
    ENTRY_FEES,
    PRICE_RANGES,
    matchesNoiseLevel,
    matchesEntryFee
} from '../../lib/venue-mapping';

// Filter option types
export interface FilterOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

export interface ActiveFilters {
    entryFee: string | null;
    noiseLevel: string | null;
    priceRange: string | null;
    neighborhood: string | null;
}

interface VenueFilterRailProps {
    activeFilters: ActiveFilters;
    onFilterChange: (filters: ActiveFilters) => void;
    venueCount: number;
    filteredCount: number;
    neighborhoodOptions: FilterOption[];
}

// Define filter options using Single Source of Truth
const entryFeeOptions: FilterOption[] = [
    { value: ENTRY_FEES.FREE.id, label: ENTRY_FEES.FREE.label },
    { value: ENTRY_FEES.PAID.id, label: ENTRY_FEES.PAID.label },
    { value: ENTRY_FEES.VARIES.id, label: ENTRY_FEES.VARIES.label },
];

const noiseLevelOptions: FilterOption[] = [
    { value: NOISE_LEVELS.CONVERSATION.id, label: NOISE_LEVELS.CONVERSATION.label },
    { value: NOISE_LEVELS.LOUD.id, label: NOISE_LEVELS.LOUD.label },
    { value: NOISE_LEVELS.EARPLUGS.id, label: NOISE_LEVELS.EARPLUGS.label },
];

const priceRangeOptions: FilterOption[] = [
    { value: PRICE_RANGES.BUDGET.id, label: PRICE_RANGES.BUDGET.label },
    { value: PRICE_RANGES.MID.id, label: PRICE_RANGES.MID.label },
    { value: PRICE_RANGES.PREMIUM.id, label: PRICE_RANGES.PREMIUM.label },
];

// Filter chip component
const FilterChip = ({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) => (
    <button
        onClick={onClick}
        className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            "border hover:border-primary/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background",
            isActive
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                : "bg-card/50 text-muted-foreground border-border/50 hover:bg-card hover:text-foreground"
        )}
    >
        {label}
    </button>
);

// Filter group component
const FilterGroup = ({
    title,
    options,
    activeValue,
    onSelect,
}: {
    title: string;
    options: FilterOption[];
    activeValue: string | null;
    onSelect: (value: string | null) => void;
}) => (
    <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
            {title}
        </span>
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <FilterChip
                    key={option.value}
                    label={option.label}
                    isActive={activeValue === option.value}
                    onClick={() => onSelect(activeValue === option.value ? null : option.value)}
                />
            ))}
        </div>
    </div>
);

export default function VenueFilterRail({
    activeFilters,
    onFilterChange,
    venueCount,
    filteredCount,
    neighborhoodOptions,
}: VenueFilterRailProps) {
    const [isNeighborhoodOpen, setIsNeighborhoodOpen] = React.useState(false);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.neighborhood-dropdown')) {
                setIsNeighborhoodOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const selectedNeighborhoodLabel = activeFilters.neighborhood
        ? neighborhoodOptions.find(opt => opt.value === activeFilters.neighborhood)?.label
        : "All Neighborhoods";

    const hasActiveFilters = Object.values(activeFilters).some(Boolean);

    const updateFilter = (key: keyof ActiveFilters, value: string | null) => {
        onFilterChange({
            ...activeFilters,
            [key]: value,
        });
    };

    const clearAllFilters = () => {
        onFilterChange({
            entryFee: null,
            noiseLevel: null,
            priceRange: null,
            neighborhood: null,
        });
    };

    return (
        <div className="relative">
            {/* Subtle glassmorphic background */}
            <div className="absolute inset-0 bg-card/40 backdrop-blur-xl rounded-2xl" />
            <div className="absolute inset-0 border border-white/[0.05] rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl" />

            {/* Main content */}
            <div className="relative px-6 py-5">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        {/* Filter icon with glow */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
                            <div className="relative w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">Filter Venues</h3>
                            <p className="text-xs text-muted-foreground">
                                Showing <span className="text-primary font-medium">{filteredCount}</span> of{' '}
                                <span className="text-foreground">{venueCount}</span> venues
                            </p>
                        </div>
                    </div>

                    {/* Clear filters button */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Clear all
                        </button>
                    )}
                </div>

                {/* Filter groups */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">

                    {/* Neighborhood Dropdown Pill Custom */}
                    <div className="flex flex-col gap-2 min-w-[200px] neighborhood-dropdown relative z-20">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                            Neighborhood
                        </span>

                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsNeighborhoodOpen(!isNeighborhoodOpen);
                                }}
                                className={cn(
                                    "w-full flex items-center justify-between px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                    "border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background",
                                    activeFilters.neighborhood || isNeighborhoodOpen
                                        ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                                        : "bg-card/50 text-muted-foreground border-border/50 hover:bg-card hover:text-foreground"
                                )}
                            >
                                <span className="truncate mr-2">{selectedNeighborhoodLabel}</span>
                                <svg
                                    className={cn("w-4 h-4 flex-shrink-0 transition-transform duration-200", isNeighborhoodOpen && "rotate-180")}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isNeighborhoodOpen && (
                                <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
                                    <button
                                        onClick={() => {
                                            updateFilter('neighborhood', null);
                                            setIsNeighborhoodOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary/10",
                                            !activeFilters.neighborhood ? "text-primary font-medium bg-primary/5" : "text-foreground"
                                        )}
                                    >
                                        All Neighborhoods
                                    </button>
                                    <div className="h-px bg-border/50 my-1 mx-2" />
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                        {neighborhoodOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => {
                                                    updateFilter('neighborhood', opt.value);
                                                    setIsNeighborhoodOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/10",
                                                    activeFilters.neighborhood === opt.value ? "text-primary font-medium bg-primary/5" : "text-foreground"
                                                )}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:block w-px bg-border/50 self-stretch" />

                    <FilterGroup
                        title="Entry Fee"
                        options={entryFeeOptions}
                        activeValue={activeFilters.entryFee}
                        onSelect={(value) => updateFilter('entryFee', value)}
                    />

                    <div className="hidden lg:block w-px bg-border/50 self-stretch" />

                    <FilterGroup
                        title="Noise Level"
                        options={noiseLevelOptions}
                        activeValue={activeFilters.noiseLevel}
                        onSelect={(value) => updateFilter('noiseLevel', value)}
                    />

                    <div className="hidden lg:block w-px bg-border/50 self-stretch" />

                    <FilterGroup
                        title="Price Range"
                        options={priceRangeOptions}
                        activeValue={activeFilters.priceRange}
                        onSelect={(value) => updateFilter('priceRange', value)}
                    />
                </div>

                {/* Active filters indicator line */}
                {hasActiveFilters && (
                    <div className="mt-5 pt-4 border-t border-border/30">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs text-muted-foreground">Active:</span>
                            {activeFilters.neighborhood && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                                    {neighborhoodOptions.find(o => o.value === activeFilters.neighborhood)?.label || activeFilters.neighborhood}
                                    <button
                                        onClick={() => updateFilter('neighborhood', null)}
                                        className="hover:bg-purple-500/20 rounded-full p-0.5"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {activeFilters.entryFee && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                    {entryFeeOptions.find(o => o.value === activeFilters.entryFee)?.label}
                                    <button
                                        onClick={() => updateFilter('entryFee', null)}
                                        className="hover:bg-primary/20 rounded-full p-0.5"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {activeFilters.noiseLevel && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                                    {noiseLevelOptions.find(o => o.value === activeFilters.noiseLevel)?.label}
                                    <button
                                        onClick={() => updateFilter('noiseLevel', null)}
                                        className="hover:bg-accent/20 rounded-full p-0.5"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                            {activeFilters.priceRange && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                                    {priceRangeOptions.find(o => o.value === activeFilters.priceRange)?.label}
                                    <button
                                        onClick={() => updateFilter('priceRange', null)}
                                        className="hover:bg-green-500/20 rounded-full p-0.5"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper function to filter venues based on active filters
export function filterVenues(venues: any[], filters: ActiveFilters): any[] {
    return venues.filter((venue) => {
        const schema = venue.venueSchemaData || {};

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
