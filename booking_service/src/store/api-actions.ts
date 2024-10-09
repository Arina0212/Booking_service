import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { redirectToRoute } from './action';
import { APIRoute, AppRoute } from '../const';
import { dropToken, saveToken } from '../services/token';
import { SignInData, UserData } from '../types/SignInData';
import { AuthData, LoginData } from '../types/LoginData';

// export const checkAuthAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/checkAuth',
//   async (_arg, {extra: api}) => {
//     await api.get(APIRoute.Login);
//   },
// );

export const loginAction = createAsyncThunk<
    LoginData,
    AuthData,
    {
        dispatch: AppDispatch;
        state: State;
        extra: AxiosInstance;
    }
>('auth/login', async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(data.token);
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
>('auth/register', async ({ first_name, last_name, patronymic, password, email }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.SignIn, {
        first_name,
        last_name,
        patronymic,
        password,
        email,
    });
    saveToken(data.token);
    if (data.email === undefined) {
        dispatch(redirectToRoute(AppRoute.Main));
    } else {
    }
    return data;
});
