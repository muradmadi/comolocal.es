export const NOISE_LEVELS = {
    CONVERSATION: {
        id: 'conversation',
        label: 'Quiet',
        matchers: ['chat', 'conversation', 'friendly', 'quiet']
    },
    LOUD: {
        id: 'loud',
        label: 'Loud',
        matchers: ['loud']
    },
    EARPLUGS: {
        id: 'earplugs',
        label: 'Earplugs',
        matchers: ['deafening', 'earplus', 'club', 'earplug', 'very']
    }
} as const;

export const ENTRY_FEES = {
    FREE: {
        id: 'free',
        label: 'Free Entry',
        matchers: ['none', 'free']
    },
    PAID: {
        id: 'paid',
        label: 'Paid Entry',
        matchers: ['always', 'paid']
    },
    VARIES: {
        id: 'varies',
        label: 'Varies',
        matchers: ['varies']
    }
} as const;

export const PRICE_RANGES = {
    BUDGET: {
        id: 'budget',
        label: '€ Budget (< €10)',
        max: 10
    },
    MID: {
        id: 'mid',
        label: '€€ Mid-Range (€10-15)',
        min: 10,
        max: 15
    },
    PREMIUM: {
        id: 'premium',
        label: '€€€ Premium (> €15)',
        min: 15
    }
} as const;

// --- Helper Functions ---

export function getNoiseLevelLabel(raw: string | undefined | null): string {
    if (!raw) return 'Unknown';
    const n = raw.toLowerCase();

    if (NOISE_LEVELS.CONVERSATION.matchers.some(m => n.includes(m))) return NOISE_LEVELS.CONVERSATION.label;
    if (NOISE_LEVELS.EARPLUGS.matchers.some(m => n.includes(m))) return NOISE_LEVELS.EARPLUGS.label;
    if (NOISE_LEVELS.LOUD.matchers.some(m => n.includes(m))) return NOISE_LEVELS.LOUD.label;

    return raw; // Fallback to raw if no match
}

export function getEntryFeeLabel(raw: string | undefined | null): string {
    if (!raw) return ENTRY_FEES.FREE.label; // Treat null/undefined as Free? Or Varies? Current logic treats (!raw) as Free.
    const s = raw.toLowerCase();

    if (ENTRY_FEES.FREE.matchers.some(m => s.includes(m))) return ENTRY_FEES.FREE.label;
    if (ENTRY_FEES.PAID.matchers.some(m => s.includes(m))) return ENTRY_FEES.PAID.label;

    return ENTRY_FEES.VARIES.label;
}

export function getPriceRangeId(price: number): string {
    if (price < PRICE_RANGES.BUDGET.max) return PRICE_RANGES.BUDGET.id;
    if (price <= PRICE_RANGES.MID.max) return PRICE_RANGES.MID.id;
    return PRICE_RANGES.PREMIUM.id;
}

// For Filter Logic: Check if raw data matches a filter ID
export function matchesNoiseLevel(raw: string | undefined | null, filterId: string): boolean {
    const n = (raw || '').toLowerCase();

    if (filterId === NOISE_LEVELS.CONVERSATION.id) {
        return NOISE_LEVELS.CONVERSATION.matchers.some(m => n.includes(m));
    }
    if (filterId === NOISE_LEVELS.LOUD.id) {
        return NOISE_LEVELS.LOUD.matchers.some(m => n.includes(m));
    }
    if (filterId === NOISE_LEVELS.EARPLUGS.id) {
        return NOISE_LEVELS.EARPLUGS.matchers.some(m => n.includes(m));
    }
    return false;
}

export function matchesEntryFee(raw: string | undefined | null, filterId: string): boolean {
    const s = (raw || '').toLowerCase();

    if (filterId === ENTRY_FEES.FREE.id) {
        // strict check for free: if empty logic handled in component, here we assume raw is valid string or empty.
        // If raw is empty string, does it match free? Yes, based on previous logic.
        return !s || ENTRY_FEES.FREE.matchers.some(m => s.includes(m));
    }
    if (filterId === ENTRY_FEES.PAID.id) {
        return ENTRY_FEES.PAID.matchers.some(m => s.includes(m));
    }
    if (filterId === ENTRY_FEES.VARIES.id) {
        return ENTRY_FEES.VARIES.matchers.some(m => s.includes(m));
    }
    return false;
}
