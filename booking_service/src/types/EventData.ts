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
    id?: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    seats_number?: number;
};

export type EventTimeSlots = {
    id: number;
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

export type EventCustomDateRegiser = {
    title: string;
    value: string;
};

export type EventPostInputData = {
    event: EventFullData;
    photo: File | null;
    schedule: File | null;
};
export type EventPostOutputData = {
    msg: string;
    event_id: number;
    event_link: string;
    registration_link: string;
};

export type EventPutEditInputData = {
    updated_event: EventFullData;
    photo: File | null;
    schedule: File | null;
    id: number;
};
export type EventFullData = {
    event_dates_times: EventDate[];
    name?: string;
    custom_fields: EventCustomDate[];
    city?: string;
    address?: string;
    visit_cost?: number;
    status?: string;
    format: string;
    description?: string;
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
    online_link: string;
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
            id: number;
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

export type RegisterForEvent = {
    event_id: number;
    custom_fields: EventCustomDateRegiser[] | null;
    event_date_time_id: number;
    expiration_days: number | null;
};
export type RegisterForEventOutput = {
    message: string;
};

type Email = { email: string };

export type InviteByEmails = {
    event_id: number;
    users_emails: Email[];
};

export type OnlineLink = {
    event_id: number;
    online_link: string;
};
export type OnlineLinkOutput = {
    msg: string;
};

export type InfoForRegister = {
    dates: [
        {
            date_time_id: number;
            start_date: string;
            end_date: string;
            start_time: string;
            end_time: string;
            seats_number: number;
        },
    ];
    custom_fields: [
        {
            field_id: number;
            title: string;
        },
    ];
};

export type Member = {
    id: number;
    first_name: string;
    last_name: string;
    patronymic: string;
    email: string;
    phone_number: string;
    vk: string;
    telegram: string;
    whatsapp: string;
    photo: string;
    custom_fields: [
        {
            field_title: string;
            field_value: string;
        },
    ];
};
export type MemberInfo = {
    id: number;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    seats_number: number;
    bookings_count: number;
    members: Member[];
};

export type MembersInfo = [MemberInfo];
export type Cities = { cities: [string] };
export type TransformedCities = { cities: { labelValue: string }[] };

export type EventsShortData = EventShortData[];
