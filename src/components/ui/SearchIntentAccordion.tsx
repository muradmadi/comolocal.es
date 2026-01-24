import React, { useState } from 'react';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists based on component directory structure, if not I'll inline.

// Inline helper if not present
function cn_inline(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

type AccordionItem = {
    id: string;
    label: string;
    content: string;
    linkText: string;
    linkUrl: string;
};

const items: AccordionItem[] = [
    {
        id: 'budget',
        label: "Finding Cheap Student Parties in Madrid",
        content: "Madrid is famous for its nightlife, but it doesn't have to be expensive. We track the best happy hours, free entry guestlists, and low-cost cover charges specifically for the student budget. From the 1 euro beers at 100 Montaditos to free entry at Kapital before certain hours, our guide ensures you never overpay.",
        linkText: "Browse Budget Venues",
        linkUrl: "/venues?price=budget"
    },
    {
        id: 'techno',
        label: "Best Techno and Underground Clubs",
        content: "If you're tired of commercial hits and seeking the thumping bass of proper techno, Madrid's underground scene delivers. We cover legendary spots like Fabrik, Mondo Disko, and secret warehouse raves. Discover where the locals dance until 7 AM.",
        linkText: "Explore Techno Clubs",
        linkUrl: "/venues?noise=earplugs"
    },
    {
        id: 'erasmus',
        label: "International Student Meetups & Erasmus",
        content: "Arriving in a new city can be daunting. Our curated list of Erasmus parties and international meetups helps you connect with fellow global students. Whether it's Monday night at City Hall or Thursday at Kapital, we know where the international crowd gathers.",
        linkText: "See Student Events",
        linkUrl: "/events"
    },
    {
        id: 'dresscode',
        label: "Madrid Nightlife Dress Codes & Entry Rules",
        content: "Don't get turned away at the door. Madrid's bouncers can be strict. We provide detailed breakdowns of dress codes for every major venue—from 'casual chic' to 'strict elegance'. Know before you go to avoid the walk of shame.",
        linkText: "Read the Survival Guide",
        linkUrl: "/blog"
    }
];

export default function SearchIntentAccordion() {
    const [openItem, setOpenItem] = useState<string | null>('budget'); // Open first by default or null

    return (
        <section className="py-24 bg-background relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4 max-w-5xl">

                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-4">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        The Knowledge Base
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Everything you need to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Navigate the Night</span>.
                    </h2>
                </div>

                <div className="space-y-4">
                    {items.map((item) => {
                        const isOpen = openItem === item.id;
                        return (
                            <div
                                key={item.id}
                                className={cn_inline(
                                    "group rounded-3xl transition-all duration-500 overflow-hidden border",
                                    isOpen
                                        ? "bg-card border-primary/50 shadow-[0_0_30px_-5px_rgba(124,58,237,0.1)]"
                                        : "bg-card/30 border-white/5 hover:border-white/10 hover:bg-card/50"
                                )}
                            >
                                <button
                                    onClick={() => setOpenItem(isOpen ? null : item.id)}
                                    className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                                    aria-expanded={isOpen}
                                >
                                    <span className={cn_inline(
                                        "text-xl md:text-3xl font-bold tracking-tight transition-colors duration-300",
                                        isOpen ? "text-primary" : "text-foreground group-hover:text-foreground/80"
                                    )}>
                                        {item.label}
                                    </span>
                                    <div className={cn_inline(
                                        "flex-shrink-0 ml-4 w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300",
                                        isOpen ? "bg-primary text-white border-primary rotate-180" : "bg-transparent text-muted-foreground border-white/10 group-hover:border-white/20"
                                    )}>
                                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>

                                <div
                                    className={cn_inline(
                                        "transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden",
                                        isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                                    )}
                                >
                                    <div className="p-6 md:p-8 pt-0 max-w-3xl">
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                            {item.content}
                                        </p>
                                        <a
                                            href={item.linkUrl}
                                            className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group/link"
                                        >
                                            {item.linkText}
                                            <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
