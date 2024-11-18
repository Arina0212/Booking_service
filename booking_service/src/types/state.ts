import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { ProfileData } from './ProfileData';
import { EventShortData, EventsShortData } from './EventData';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    error: string;
    email: string;
    profileData?: ProfileData;
    isProfileLoading?: boolean;
    isLoading?: boolean;
};

export type EventProcess = {
    allEvents: EventsShortData;
    isEventsLoading?: boolean;
    event?: EventShortData;
    isEventLoading?: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
