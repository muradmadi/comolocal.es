import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { cn } from '@/lib/utils';
import type { Venue } from '@/types/wordpress';

// Fix for default Leaflet icons in webpack/vite environments
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom "Premium" Dark Mode Marker
const createCustomIcon = (isHovered: boolean) => {
    return L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="relative flex items-center justify-center">
                 <div class="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-[0_0_15px_hsl(var(--primary))] ${isHovered ? 'scale-125' : ''} transition-transform duration-300"></div>
                 <div class="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-75"></div>
               </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
};

interface InteractiveMapProps {
    venues: Venue[];
    initialZoom?: number;
    className?: string;
}

// Helper to center bounds
const MapBounds = ({ bounds }: { bounds: L.LatLngBounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);
    return null;
};

export default function InteractiveMap({ venues, initialZoom = 13, className }: InteractiveMapProps) {
    const [activeVenue, setActiveVenue] = useState<string | null>(null);

    // Filter and parse venues - Memoized to prevent re-calculation on state changes
    const mapVenues = React.useMemo(() => venues.map(venue => {
        const coordsStr = venue.venueSchemaData.longitudeLatitude;
        if (!coordsStr) return null;

        const [latStr, lngStr] = coordsStr.split(',').map(s => s.trim());
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);

        if (isNaN(lat) || isNaN(lng)) return null;

        return {
            ...venue,
            position: [lat, lng] as [number, number]
        };
    }).filter((v): v is (Venue & { position: [number, number] }) => v !== null), [venues]);

    const bounds = React.useMemo(() => {
        if (mapVenues.length === 0) return null;
        return L.latLngBounds(mapVenues.map(v => v.position));
    }, [mapVenues]);

    const center = React.useMemo(() => {
        return mapVenues.length > 0 ? mapVenues[0].position : [40.4168, -3.7038] as [number, number];
    }, [mapVenues]);

    if (mapVenues.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
                <div className="text-center p-6 relative z-10">
                    <p className="text-muted-foreground font-medium">No locations found on the map.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("w-full h-full relative z-0", className)}>


            <style>{`
                .leaflet-container {
                    width: 100%;
                    height: 100%;
                    background-color: #1a1a1a; 
                    font-family: inherit;
                }
                .leaflet-popup-content-wrapper {
                    background: hsl(var(--card));
                    color: hsl(var(--card-foreground));
                    border: 1px solid hsl(var(--border));
                    border-radius: 0.75rem;
                    padding: 0;
                    overflow: hidden;
                    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
                }
                .leaflet-popup-content {
                    margin: 0;
                    width: 280px !important;
                }
                .leaflet-popup-tip {
                    background: hsl(var(--border));
                }
                .leaflet-popup-close-button {
                    color: hsl(var(--muted-foreground)) !important;
                    top: 10px !important;
                    right: 10px !important;
                    font-size: 24px !important;
                    font-weight: 300 !important;
                    width: 24px !important;
                    height: 24px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    background: rgba(0,0,0,0.2) !important;
                    border-radius: 50% !important;
                    margin: 0 !important;
                    padding-bottom: 4px !important;
                }
                .custom-map-marker {
                    background: transparent;
                    border: none;
                }
            `}</style>

            <MapContainer
                center={center}
                zoom={initialZoom}
                scrollWheelZoom={true}
                zoomControl={false}
            >
                {/* Premium Dark Tiles */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {/* Auto-fit bounds */}
                {bounds && <MapBounds bounds={bounds} />}

                {mapVenues.map(venue => (
                    <Marker
                        key={venue.slug}
                        position={venue.position}
                        icon={createCustomIcon(activeVenue === venue.slug)}
                        eventHandlers={{
                            click: () => setActiveVenue(venue.slug),
                            popupopen: () => setActiveVenue(venue.slug),
                            popupclose: () => setActiveVenue(null)
                        }}
                    >
                        <Popup closeButton={true} className="premium-popup">
                            <div className="flex flex-col">
                                <div className="relative h-32 w-full bg-muted overflow-hidden">
                                    {venue.featuredImage?.node?.sourceUrl ? (
                                        <img src={venue.featuredImage.node.sourceUrl} alt={venue.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-2xl">📍</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3 text-white">
                                        <h3 className="font-bold text-lg leading-tight">{venue.title}</h3>
                                    </div>
                                </div>
                                <div className="p-4 bg-card">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {venue.venueSchemaData.cocktailPrice && (
                                            <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
                                                €{venue.venueSchemaData.cocktailPrice} Cocktails
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                        {venue.content?.replace(/(<([^>]+)>)/gi, "") || "No description available."}
                                    </p>
                                    <a
                                        href={`/venues/${venue.slug}/`}
                                        className="block w-full py-2 px-4 bg-primary !text-white text-center rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                                    >
                                        View Venue
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
