import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { ProfileData } from './ProfileData';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    error: string;
    email: string;
    profileData?: ProfileData;
    isProfileLoading?: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
