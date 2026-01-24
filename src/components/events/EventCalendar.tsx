import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import type { Event } from '@/types/wordpress';

interface EventCalendarProps {
    events: Event[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        // 0 = Sunday, 1 = Monday, etc.
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
        setSelectedDate(null);
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Adjust for Monday start (standard in Europe/Spain)
    // Sunday is 0 -> becomes 6. Monday is 1 -> becomes 0.
    const startOffset = firstDay === 0 ? 6 : firstDay - 1;

    const days = [];
    for (let i = 0; i < startOffset; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // Filter events for this month
    const currentDateEvents = events.filter(event => {
        if (!event.eventData?.eventStart) return false;
        const eventDate = new Date(event.eventData.eventStart);
        return eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear();
    });

    const getEventsForDay = (day: number) => {
        return currentDateEvents.filter(event => {
            const eventDate = new Date(event.eventData.eventStart);
            return eventDate.getDate() === day;
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Calendar Grid */}
            <div className="flex-1 bg-card border border-border/50 rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 flex items-center justify-between border-b border-border/50 bg-muted/30">
                    <h2 className="text-xl font-bold font-heading flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        {monthNames[currentDate.getMonth()]} <span className="text-muted-foreground font-normal">{currentDate.getFullYear()}</span>
                    </h2>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                            aria-label="Previous month"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                            aria-label="Next month"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-b border-border/50 bg-muted/10">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="py-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 auto-rows-fr bg-card">
                    {days.map((day, index) => {
                        if (day === null) {
                            return <div key={`empty-${index}`} className="min-h-[100px] border-b border-r border-border/30 bg-muted/5"></div>;
                        }

                        const dayEvents = getEventsForDay(day);
                        const isToday = day === new Date().getDate() &&
                            currentDate.getMonth() === new Date().getMonth() &&
                            currentDate.getFullYear() === new Date().getFullYear();

                        const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth();

                        return (
                            <div
                                key={day}
                                className={cn(
                                    "min-h-[100px] p-2 border-b border-r border-border/30 relative transition-all cursor-pointer hover:bg-accent/5",
                                    isToday && "bg-primary/5",
                                    isSelected && "ring-2 ring-inset ring-primary bg-accent/10"
                                )}
                                onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                            >
                                <span className={cn(
                                    "text-sm font-medium inline-flex w-7 h-7 items-center justify-center rounded-full mb-1",
                                    isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                                )}>
                                    {day}
                                </span>

                                <div className="space-y-1">
                                    {dayEvents.map((event, idx) => (
                                        <div
                                            key={event.id}
                                            className="text-[10px] sm:text-xs truncate px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                                            title={event.title}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Selected Date Details (Sidebar) */}
            <div className="w-full lg:w-80 space-y-4">
                <div className="bg-card border border-border/50 rounded-xl p-6 h-full shadow-sm sticky top-24">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" />
                        {selectedDate ? (
                            <span>
                                {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </span>
                        ) : (
                            <span className="text-muted-foreground">Select a date</span>
                        )}
                    </h3>

                    <div className="space-y-4">
                        {selectedDate ? (
                            (() => {
                                const eventsOnDate = getEventsForDay(selectedDate.getDate());
                                if (eventsOnDate.length === 0) {
                                    return (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <p>No events scheduled for this day.</p>
                                        </div>
                                    );
                                }
                                return eventsOnDate.map(event => (
                                    <a
                                        key={event.id}
                                        href={`/events/${event.slug}`}
                                        className="block p-3 rounded-lg bg-muted/30 border border-transparent hover:border-primary/50 hover:bg-muted/50 transition-all group"
                                    >
                                        <div className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                                            {event.title}
                                        </div>
                                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                            <span>
                                                {new Date(event.eventData.eventStart).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                            </span>
                                            <span>•</span>
                                            <span>{event.eventData.relatedVenue?.nodes?.[0]?.title || 'Unknown Venue'}</span>
                                        </div>
                                    </a>
                                ));
                            })()
                        ) : (
                            <div className="text-center py-8 text-muted-foreground/60 text-sm">
                                <p>Click on a date to view events</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
