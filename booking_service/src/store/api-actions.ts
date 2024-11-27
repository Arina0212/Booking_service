import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { SignInData, UserData } from '../types/SignInData';
import { AuthData, LoginData } from '../types/LoginData';
import { ProfileData } from '../types/ProfileData';
import { Cities, EventShortData, EventsShortData } from '../types/EventData';

export const loginAction = createAsyncThunk<
    LoginData,
    AuthData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('auth/login', async ({ email, password }: AuthData, { dispatch, extra: api }): Promise<LoginData> => {
    const { data } = await api.post<LoginData>(APIRoute.Login, { email, password });
    saveToken(data.access_token);
    if (data.error === undefined) {
        dispatch(redirectToRoute(AppRoute.Main));
    } else {
    }
    dispatch(fetchProfileData());
    return data;
});

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
        dispatch(redirectToRoute(AppRoute.Main));
    } else {
    }
    dispatch(fetchProfileData());
    return data;
});

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
        { first_name, last_name, patronymic, email, birth_date, city, phone_number, company_name, vk, telegram, whatsapp, photo },
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
            photo,
        });
        dispatch(fetchProfileData());
        return data;
    },
);

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

export const fetchEventData = createAsyncThunk<
    EventShortData,
    { id: number },
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('data/fetchEventData', async ({ id }, { extra: api }) => {
    const { data } = await api.get<EventShortData>(`${APIRoute.Event}${id}/view/`);
    return data;
});

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
