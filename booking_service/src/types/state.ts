import { AuthorizationStatus } from '../const';
import { store } from '../store';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    error: string;
    email: string;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
