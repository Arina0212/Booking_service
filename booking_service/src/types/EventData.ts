export type EventShortData = {
    id: number;
    name: string;
    start_date: string;
    start_time: string;
    end_time: string;
    end_date: string;
    city: string;
    visit_cost: number;
    format: string;
    photo_url: string;
};

export type EventTime = {
    start_time: string;
    end_time: string;
    seats_number: number;
    description: string;
};

export type EventDate = {
    event_date: string;
    event_times: EventTime[];
};
export type EventCustomDate = {
    title: string;
};

export type EventPostInputData = {
    event: EventFullData;
    photo: File | null;
};
export type EventPostOutputData = {
    msg: string;
    event_id: number;
    registration_link: string;
};

export type EventFullData = {
    event_dates: EventDate[];
    name: string;
    custom_fields: EventCustomDate[];
    city: string;
    address: string;
    visit_cost: number;
    status: string;
    format: string;
    description: string;
};

export type EventViewData = {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    city: string;
    address: string;
    visit_cost: number;
    format: string;
    photo_url: string | null;
    creator: {
        first_name: string;
        last_name: string;
        patronymic: string;
        company: string;
        photo_url: string | null;
        contacts: {
            phone_number: string;
            vk: string;
            telegram: string;
            whatsapp: string;
        };
    };
    time_slots_descriptions: [
        {
            date: string;
            start_time: string;
            end_time: string;
            description: string;
            seats_number: number | null;
            bookings_count: number;
        },
    ];
};

export type Cities = { cities: [string] };
export type TransformedCities = { cities: { labelValue: string }[] };

export type EventsShortData = EventShortData[];
