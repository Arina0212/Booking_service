import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { loginAction, logoutAction, SignInAction } from '../api-actions';

const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    error: ' ',
    email: '',
};

export const userProcess = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // .addCase(checkAuthAction.fulfilled, (state) => {
            //   state.authorizationStatus = AuthorizationStatus.Auth;
            // })
            // .addCase(checkAuthAction.rejected, (state) => {
            //   state.authorizationStatus = AuthorizationStatus.NoAuth;
            // })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.error = action.payload.error;
                if (state.error === undefined) {
                    state.authorizationStatus = AuthorizationStatus.Auth;
                } else {
                    state.authorizationStatus = AuthorizationStatus.NoAuth;
                }
            })
            .addCase(SignInAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(SignInAction.fulfilled, (state, action) => {
                state.email = action.payload.email;
                if (state.email === undefined) {
                    state.authorizationStatus = AuthorizationStatus.Auth;
                } else {
                    state.authorizationStatus = AuthorizationStatus.NoAuth;
                }
            })
            .addCase(loginAction.rejected, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            });
    },
});
