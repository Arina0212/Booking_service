import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosError, AxiosInstance } from 'axios';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { SignInData, UserData } from '../types/SignInData';
import { AuthData, LoginData } from '../types/LoginData';
import { ChangePasswordPhoto, ChangeProfilePhoto, ProfileData } from '../types/ProfileData';
import {
    Cities,
    EventPostInputData,
    EventPostOutputData,
    EventPutEditInputData,
    EventsShortData,
    EventViewData,
    FilledCustom,
    FiltersData,
    InfoForRegister,
    InviteByEmails,
    MembersInfo,
    OnlineLink,
    OnlineLinkOutput,
    RegisterForEvent,
    RegisterForEventOutput,
} from '../types/EventData';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import browserHistory from '../browser-history';

//Вход
export const loginAction = createAsyncThunk<
    LoginData,
    AuthData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('auth/login', async ({ email, password }: AuthData, { dispatch, extra: api }): Promise<LoginData> => {
    try {
        const { data } = await api.post<LoginData>(APIRoute.Login, { email, password });
        saveToken(data.access_token);
        if (data.error === undefined) {
            //dispatch(redirectToRoute(AppRoute.Main));

            browserHistory.back();
        }
        dispatch(fetchProfileData());
        return data;
    } catch (error) {
        toast.error('Неверный логин или пароль');
        throw error;
    }
});

//Выход
export const logoutAction = createAsyncThunk<
    void,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('auth/logout', async (_arg, { dispatch, extra: api }) => {
    await api.post(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Main));
});

//Регистрация
export const SignInAction = createAsyncThunk<
    UserData,
    SignInData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('auth/register', async ({ password, email }: SignInData, { dispatch, extra: api }): Promise<UserData> => {
    const { data } = await api.post<UserData>(APIRoute.SignIn, {
        password,
        email,
    });
    saveToken(data.access_token);
    if (data.email === undefined) {
        browserHistory.back();
        browserHistory.back();
    } else {
    }
    dispatch(fetchProfileData());
    return data;
});

//Смена пароля
export const ChangePasswordAction = createAsyncThunk<
    ChangePasswordPhoto,
    ChangePasswordPhoto,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('auth/changePasswordAction', async ({ password }: ChangePasswordPhoto, { extra: api, rejectWithValue }) => {
    try {
        const { data } = await api.post<ChangePasswordPhoto>(APIRoute.ChangePassword, {
            password,
        });
        toast.success('Пароль успешно изменен');
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            return rejectWithValue(error.response?.data || 'Ошибка при изменении пароля');
        }
        return rejectWithValue('Неизвестная ошибка');
    }
});

//Получение информации о профиле
export const fetchProfileData = createAsyncThunk<
    ProfileData,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchProfileData', async (_arg, { extra: api }) => {
    const { data } = await api.get<ProfileData>(APIRoute.ProfileData);
    return data;
});

//Редактирование профиля
export const postProfileDataAction = createAsyncThunk<
    ProfileData,
    ProfileData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>(
    'patient/postProfileData',
    async (
        { first_name, last_name, patronymic, email, birth_date, city, phone_number, company_name, vk, telegram, whatsapp },
        { dispatch, extra: api },
    ) => {
        const { data } = await api.put<ProfileData>(APIRoute.ProfileData, {
            first_name,
            last_name,
            patronymic,
            email,
            birth_date,
            city,
            phone_number,
            company_name,
            vk,
            telegram,
            whatsapp,
        });
        dispatch(fetchProfileData());
        return data;
    },
);

//Редактирование фото пользователя
export const changeProfilePhoto = createAsyncThunk<
    ChangeProfilePhoto,
    ChangeProfilePhoto,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/changeProfilePhoto', async ({ new_photo }, { dispatch, extra: api }) => {
    const formData = new FormData();
    if (new_photo) {
        formData.append('new_photo', new_photo);
    } else {
        console.warn('Photo is null, not appending it to FormData');
    }

    const { data } = await api.put<ChangeProfilePhoto>(APIRoute.EditProfilePhoto, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    dispatch(fetchProfileData());
    toast.success('Фото успешно сохранено');
    return data;
});

//Получение списка всех мероприятий
export const fetchAllEventsData = createAsyncThunk<
    EventsShortData,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchAllEventsData', async (_arg, { extra: api }) => {
    const { data } = await api.get<EventsShortData>(APIRoute.Events);
    return data;
});

//Получение информации о мероприятии
export const fetchEventData = createAsyncThunk<
    EventViewData,
    { id: number | string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchEventData', async ({ id }, { extra: api }) => {
    const { data } = await api.get<EventViewData>(`${APIRoute.Event}${id}/view/`);
    return data;
});

//Получение моих мероприятий
export const fetchMyEventsData = createAsyncThunk<
    EventsShortData,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchMyEventsData', async (_arg, { extra: api }) => {
    const { data } = await api.get<EventsShortData>(APIRoute.MyEvents);
    return data;
});

//Получение мероприятий с моим участием
export const fetchParticipateEventsData = createAsyncThunk<
    EventsShortData,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchParticipateEventsData', async (_arg, { extra: api }) => {
    const { data } = await api.get<EventsShortData>(APIRoute.ParticipateEvents);
    return data;
});

//Получение Других открытых мероприятий
export const fetchOtherEventsData = createAsyncThunk<
    EventsShortData,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchOtherEventsData', async (_arg, { extra: api }) => {
    const { data } = await api.get<EventsShortData>(APIRoute.OtherEvents);
    return data;
});

//Получение списка городов
export const fetchCitiesData = createAsyncThunk<
    Cities,
    undefined,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchCitiesData', async (_arg, { extra: api }) => {
    const { data } = await api.get<Cities>(APIRoute.Cities);
    return data;
});

//Создание мероприятия
export const postEventDataAction = createAsyncThunk<
    EventPostOutputData,
    EventPostInputData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/postEventData', async ({ event, photo, schedule }, { dispatch, extra: api }) => {
    const formData = new FormData();
    formData.append('event', JSON.stringify(event));
    if (photo) {
        formData.append('photo', photo);
    } else {
        console.warn('Photo is null, not appending it to FormData');
    }
    if (schedule) {
        formData.append('schedule', schedule);
    } else {
        console.warn('Photo is null, not appending it to FormData');
    }

    const { data } = await api.post<EventPostOutputData>(APIRoute.EventCreate, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    dispatch(redirectToRoute(AppRoute.Invite));
    toast.success('Мероприятие было успешно создано');
    return data;
});

//Получение кастомных полей с записями
export const fetchFilledCustomData = createAsyncThunk<
    FilledCustom,
    { id: number | string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchFilledCustomData', async ({ id }, { extra: api }) => {
    const { data } = await api.get<FilledCustom>(`${APIRoute.FilteredCustom}/${id}/`);
    return data;
});

//Редактирование мероприятия
export const editEventDataAction = createAsyncThunk<
    EventPostOutputData,
    EventPutEditInputData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/editEventData', async ({ updated_event, photo, schedule, id }, { dispatch, extra: api }) => {
    const formData = new FormData();
    formData.append('updated_event', JSON.stringify(updated_event));
    if (photo) {
        formData.append('photo', photo);
    } else {
        console.warn('Photo is null, not appending it to FormData');
    }
    if (schedule) {
        formData.append('schedule', schedule);
    } else {
        console.warn('Photo is null, not appending it to FormData');
    }

    const { data } = await api.put<EventPostOutputData>(`${APIRoute.EventUpdate}/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    dispatch(redirectToRoute(AppRoute.Invite));
    toast.success('Мероприятие было успешно отредактировано');
    return data;
});

//Завершение мероприятия
export const cancelEvent = createAsyncThunk<
    string,
    { id: number | string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/cancelEvent', async ({ id }, { dispatch, extra: api }) => {
    try {
        const { data } = await api.delete<string>(`${APIRoute.CancelEvent}/${id}/`);
        toast.success('Мероприятие завершено');

        dispatch(redirectToRoute(AppRoute.Main));
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Произошла ошибка при завершении мероприятия';
            toast.error(errorMessage);
        } else {
            toast.error('Что-то пошло не так попробуйте позже');
        }
        throw error;
    }
});

//Получение информации о мероприятии для подачи заявки
export const getInfoRegisterForEvent = createAsyncThunk<
    InfoForRegister,
    { id: number | string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/getInfoRegisterForEventData', async ({ id }, { extra: api }) => {
    try {
        const { data } = await api.get<InfoForRegister>(`${APIRoute.Regist}${id}/`);

        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Произошла ошибка при получении информации для записи на мероприятие';
            console.warn(errorMessage);
        } else {
            console.warn('Произошла ошибка');
        }
        throw error;
    }
});

//Фильтрация мероприятий
export const postFiltersAction = createAsyncThunk<
    EventsShortData,
    FiltersData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/postFiltersData', async ({ search, city, format, date_start, date_end }, { extra: api }) => {
    const { data } = await api.post<EventsShortData>(APIRoute.Filters, {
        search,
        city,
        format,
        date_start,
        date_end,
    });
    return data;
});

//Подача заявки на мероприятие
export const registerForEvent = createAsyncThunk<
    RegisterForEventOutput,
    RegisterForEvent,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>(
    'patient/registerForEventData',
    async ({ id, event_date_time_id, custom_fields, event_id, expiration_days }, { dispatch, extra: api }) => {
        try {
            const { data } = await api.post<RegisterForEventOutput>(`${APIRoute.Regist}${event_id}/`, {
                event_date_time_id,
                custom_fields,
                expiration_days: expiration_days,
            });

            toast.success('Успешная запись на мероприятие');

            dispatch(fetchEventData({ id: event_id }));
            dispatch(fetchIsMember({ id: id }));
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data?.message || 'Произошла ошибка при записи на мероприятие';
                toast.error(errorMessage);
            } else {
                toast.error('Что-то пошло не так попробуйте позже');
            }
            throw error;
        }
    },
);

//Проверка записан ли человек на мероприятие
export const fetchIsMember = createAsyncThunk<
    string,
    { id: number | string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/fetchIsMember', async ({ id }, { extra: api }) => {
    const { data } = await api.get<string>(`${APIRoute.IsMember}/${id}/`);
    return data;
});

//Отмена записи на мероприятие
export const deleteBooking = createAsyncThunk<
    string,
    { id: number | string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/deleteBooking', async ({ id }, { dispatch, extra: api }) => {
    try {
        const { data } = await api.delete<string>(`${APIRoute.CancelBooking}/${id}/`);
        toast.success('Запись успешно отменена');

        dispatch(fetchEventData({ id: id }));
        dispatch(fetchIsMember({ id: id }));
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Произошла ошибка при отмене записи на мероприятие';
            toast.error(errorMessage);
        } else {
            toast.error('Что-то пошло не так попробуйте позже');
        }
        throw error;
    }
});

//Отправка приглашения на мероприятие на введенные почты
export const sendOnEmails = createAsyncThunk<
    InviteByEmails,
    InviteByEmails,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/sendOnEmailsData', async ({ event_id, users_emails }, { extra: api }) => {
    try {
        const { data } = await api.post<InviteByEmails>(`${APIRoute.InviteByEmail}`, { event_id, users_emails });
        toast.success('Письмо было успешно отправлено');
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Произошла ошибка при отправке письма';
            toast.error(errorMessage);
        } else {
            toast.error('Что-то пошло не так попробуйте позже');
        }
        throw error;
    }
});

//Сохранение ссылки на онлайн мероприятие
export const postOnlineLink = createAsyncThunk<
    OnlineLinkOutput,
    OnlineLink,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/postOnlineLinkData', async ({ online_link, event_id }, { dispatch, extra: api }) => {
    try {
        const { data } = await api.put<OnlineLinkOutput>(`${APIRoute.OnlineLink}/${event_id}/`, {
            online_link,
        });
        toast.success('Ссылка на подключение к мероприятию успешно добавлена');
        dispatch(fetchEventData({ id: event_id }));
        return data;
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Произошла ошибка при добавлении ссылки';
            toast.error(errorMessage);
        } else {
            toast.error('Что-то пошло не так попробуйте позже');
        }
        throw error;
    }
});

//Вывод списка участников мероприятия
export const fetchListMembers = createAsyncThunk<
    MembersInfo,
    { id: number | string },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('patient/fetchListMembers', async ({ id }, { extra: api }) => {
    const { data } = await api.get<MembersInfo>(`${APIRoute.ListMembers}/${id}/`);
    return data;
});
