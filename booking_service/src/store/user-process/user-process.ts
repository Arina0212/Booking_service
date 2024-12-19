import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import { fetchProfileData, loginAction, logoutAction, SignInAction } from '../api-actions';

const initialState: UserProcess = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    error: ' ',
    email: '',
    profileData: undefined,
    isProfileLoading: true,
    isLoading: false,
};

export const userProcess = createSlice({
    name: NameSpace.User,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(loginAction.fulfilled, (state, action) => {
                state.error = action.payload.error;
                if (state.error === undefined) {
                    state.authorizationStatus = AuthorizationStatus.Auth;
                } else {
                    state.authorizationStatus = AuthorizationStatus.NoAuth;
                }
                state.isLoading = false;
            })
            .addCase(loginAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginAction.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(SignInAction.pending, (state) => {
                state.isLoading = true;
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
                state.isLoading = false;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.authorizationStatus = AuthorizationStatus.NoAuth;
            })
            .addCase(fetchProfileData.pending, (state) => {
                state.isProfileLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.profileData = action.payload;
                state.isProfileLoading = false;
            });
    },
});
