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
    state: string;
};

export type EventDate = {
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    seats_number: number;
};

export type EventTimeSlots = {
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    seats_number: number | null;
    bookings_count: number;
};
export type EventCustomDate = {
    title: string;
};

export type EventPostInputData = {
    event: EventFullData;
    photo: File | null;
    schedule: File | null;
};
export type EventPostOutputData = {
    msg: string;
    event_id: number;
    registration_link: string;
};

export type EventFullData = {
    event_dates_times: EventDate[];
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
    status: string;
    format: string;
    state: string;
    photo_url: string | null;
    schedule_url: string | null;
    creator: {
        first_name: string;
        last_name: string;
        patronymic: string;
        company: string;
        photo_url: string | null;
        contacts: {
            email: string;
            phone_number: string;
            vk: string;
            telegram: string;
            whatsapp: string;
        };
    };
    time_slots_descriptions: [
        {
            start_date: string;
            end_date: string;
            start_time: string;
            end_time: string;
            seats_number: number | null;
            bookings_count: number;
        },
    ];
};

export type FiltersData = {
    city: string | null;
    search: string | null;
    date_start: string | null;
    date_end: string | null;
    format: string | null;
};

export type Cities = { cities: [string] };
export type TransformedCities = { cities: { labelValue: string }[] };

export type EventsShortData = EventShortData[];
