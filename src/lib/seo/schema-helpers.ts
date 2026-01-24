import type { VenueSchemaData } from '@/types/wordpress';

export function mapOpeningHours(data: VenueSchemaData) {
    const days = [
        { key: 'monday', schema: 'Monday' },
        { key: 'tuesday', schema: 'Tuesday' },
        { key: 'wednesday', schema: 'Wednesday' },
        { key: 'thursday', schema: 'Thursday' },
        { key: 'friday', schema: 'Friday' },
        { key: 'saturday', schema: 'Saturday' },
        { key: 'sunday', schema: 'Sunday' },
    ] as const;

    return days
        .map((day) => {
            // Dynamic key access: data['mondayOpen']
            const open = data[`${day.key}Open` as keyof VenueSchemaData] as string;
            const close = data[`${day.key}Close` as keyof VenueSchemaData] as string;

            if (!open || !close) return null;

            return {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": `https://schema.org/${day.schema}`,
                "opens": open,
                "closes": close,
            };
        })
        .filter((day) => day !== null);
}
