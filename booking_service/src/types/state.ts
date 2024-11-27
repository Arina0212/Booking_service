import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { ProfileData } from './ProfileData';
import { Cities, EventShortData, EventsShortData } from './EventData';

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
    myEvents: EventsShortData;
    isMyEventsLoading?: boolean;
    participateEvents: EventsShortData;
    isParticipateEventsLoading?: boolean;
    otherEvents: EventsShortData;
    isOtherEventsLoading?: boolean;
    event?: EventShortData;
    isEventLoading?: boolean;
    cities?: Cities;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
