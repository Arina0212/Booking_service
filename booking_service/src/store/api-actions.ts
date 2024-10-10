import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { SignInData, UserData } from '../types/SignInData';
import { AuthData, LoginData } from '../types/LoginData';

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
    console.log(data.access_token);
    if (data.error === undefined) {
        dispatch(redirectToRoute(AppRoute.Main));
    } else {
    }
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
    return data;
});
