import React from 'react';
import { cn } from '../../lib/utils';

type PageHeaderVariant = 'blog' | 'venues' | 'events' | 'contact';

interface PageHeaderProps {
    variant: PageHeaderVariant;
    title: string;
    subtitle: string | React.ReactNode;
    /** Optional: decorative accent text for blog variant */
    accentText?: string;
    /** Optional: for events - show a live indicator */
    showLiveIndicator?: boolean;
}

// Shared animated background particles component
const FloatingParticles = ({ variant }: { variant: PageHeaderVariant }) => {
    const particleCount = variant === 'events' ? 12 : 8;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: particleCount }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "absolute rounded-full opacity-20 animate-float",
                        variant === 'blog' && "bg-primary/30",
                        variant === 'venues' && "bg-gradient-to-r from-primary to-accent",
                        variant === 'events' && "bg-accent",
                        variant === 'contact' && "bg-cyan-400"
                    )}
                    style={{
                        width: `${Math.random() * 6 + 2}px`,
                        height: `${Math.random() * 6 + 2}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 10 + 10}s`,
                    }}
                />
            ))}
        </div>
    );
};

// Blog variant - Editorial/Magazine style
const BlogHeader = ({ title, subtitle, accentText }: Omit<PageHeaderProps, 'variant'>) => (
    <div className="relative">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />

        <FloatingParticles variant="blog" />

        <div className="relative py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Editorial accent */}
                    {/* Editorial accent - Pill Style */}
                    {accentText && (
                        <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                            </span>
                            <span className="text-xs uppercase tracking-widest text-primary font-medium">
                                {accentText}
                            </span>
                        </div>
                    )}

                    {/* Main title with typewriter cursor effect */}
                    <h1 className="group text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        <span className="bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                            {title}
                        </span>
                        <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-2 animate-blink" />
                    </h1>

                    {/* Subtitle with elegant styling */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Decorative divider */}
                    <div className="mt-10 flex items-center justify-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                        <span className="h-1 w-8 rounded-full bg-gradient-to-r from-primary/80 to-primary/20" />
                        <span className="h-1 w-1 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Venues variant - Neon nightclub aesthetic with extended atmosphere
const VenuesHeader = ({ title, subtitle }: Omit<PageHeaderProps, 'variant'>) => (
    <div className="relative overflow-visible">
        {/* Extended radial glow background - goes beyond container */}
        <div className="absolute inset-x-0 -top-20 -bottom-32 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[100px]" />
            <div className="absolute top-2/3 right-1/4 translate-x-1/2 w-[400px] h-[250px] bg-primary/10 rounded-full blur-[80px]" />
        </div>

        {/* Animated scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--background)/0.03)_2px,hsl(var(--background)/0.03)_4px)]" />
        </div>

        <FloatingParticles variant="venues" />

        <div className="relative pt-16 pb-8 md:pt-20 md:pb-10">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Neon badge */}
                    <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                        </span>
                        <span className="text-xs uppercase tracking-widest text-primary font-medium">
                            Nightlife in Madrid
                        </span>
                    </div>

                    {/* Main title with neon glow effect */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        <span className="relative inline-block">
                            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-2xl opacity-50 scale-110" />
                            <span className="relative bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent drop-shadow-[0_0_25px_hsl(var(--primary)/0.5)]">
                                {title}
                            </span>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Neon line decoration - subtle */}
                    <div className="mt-8 flex items-center justify-center">
                        <div className="relative h-[2px] w-48">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
                            {/* Animated light traveling */}
                            <div className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-slide-right" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Bottom gradient fade - creates seamless transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </div>
);


// Events variant - Energetic countdown style
const EventsHeader = ({ title, subtitle, showLiveIndicator }: Omit<PageHeaderProps, 'variant'>) => (
    <div className="relative overflow-hidden">
        {/* Dynamic gradient background */}
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />

        <FloatingParticles variant="events" />

        <div className="relative py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Live indicator badge */}
                    {showLiveIndicator ? (
                        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-sm animate-pulse">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                            </span>
                            <span className="text-xs uppercase tracking-widest text-red-400 font-bold">
                                Events in Madrid
                            </span>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className="flex items-center gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-accent rounded-full animate-bounce"
                                        style={{
                                            height: `${12 + (i % 2) * 8}px`,
                                            animationDelay: `${i * 0.15}s`,
                                        }}
                                    />
                                ))}
                            </div>
                            <span className="text-xs uppercase tracking-widest text-accent font-medium">
                                Events in Madrid
                            </span>
                            <div className="flex items-center gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-accent rounded-full animate-bounce"
                                        style={{
                                            height: `${20 - (i % 2) * 8}px`,
                                            animationDelay: `${(2 - i) * 0.15}s`,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main title with energetic gradient */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
                        <span className="inline-block animate-text-shimmer bg-[linear-gradient(110deg,hsl(var(--foreground)),45%,hsl(var(--primary)),55%,hsl(var(--foreground)))] bg-[length:250%_100%] bg-clip-text text-transparent pb-4">
                            {title}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Energy bars decoration */}
                    <div className="mt-10 flex items-end justify-center gap-1">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1.5 rounded-full bg-gradient-to-t from-primary/80 to-accent/80 animate-equalizer"
                                style={{
                                    height: `${8 + Math.sin(i * 0.8) * 16}px`,
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Contact variant - Network/Connection style
const ContactHeader = ({ title, subtitle }: Omit<PageHeaderProps, 'variant'>) => (
    <div className="relative overflow-hidden">
        {/* Radar/Signal Background */}
        <div className="absolute inset-0 bg-background">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

            {/* Concentric circles / Radar effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 animate-ping-slow"
                        style={{
                            width: `${(i + 1) * 200}px`,
                            height: `${(i + 1) * 200}px`,
                            animationDuration: `${3 + i}s`,
                            animationDelay: `${i * 0.5}s`
                        }}
                    />
                ))}
            </div>
        </div>

        <FloatingParticles variant="contact" />

        <div className="relative py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Signal Indicator */}
                    <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-background/50 border border-primary/20 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        <span className="text-xs font-medium tracking-wide text-muted-foreground">
                            We are online
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 relative">
                        {/* Glitch/Signal effect layers */}
                        <span className="relative block">
                            {title}
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Connecting Nodes Decoration */}
                    <div className="mt-12 flex justify-center items-center gap-12 text-primary/20">
                        <div className="relative">
                            <div className="w-3 h-3 rounded-full bg-current" />
                            <div className="absolute top-1/2 left-full w-12 h-px bg-current" />
                        </div>
                        <div className="relative">
                            <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
                            <div className="absolute top-1/2 left-full w-12 h-px bg-current" />
                        </div>
                        <div className="relative">
                            <div className="w-3 h-3 rounded-full bg-current" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Main PageHeader component
export default function PageHeader({ variant, ...props }: PageHeaderProps) {
    switch (variant) {
        case 'blog':
            return <BlogHeader {...props} />;
        case 'venues':
            return <VenuesHeader {...props} />;
        case 'events':
            return <EventsHeader {...props} />;
        case 'contact':
            return <ContactHeader {...props} />;
        default:
            return <BlogHeader {...props} />;
    }
}
