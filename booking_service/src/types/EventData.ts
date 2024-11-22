export type EventShortData = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    city: string;
    visit_cost: number;
    format: string;
    photo_url: string;
};

export type EventsShortData = EventShortData[];
