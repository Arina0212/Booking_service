export type ProfileData = {
    first_name: string;
    last_name: string;
    patronymic: string;
    email?: string;
    birth_date?: string;
    city?: string;
    phone_number?: string;
    company_name?: string;
    vk?: string;
    telegram?: string;
    whatsapp?: string;
    photo?: string | null;
};

export type ChangeProfilePhoto = {
    new_photo: File | null;
};
