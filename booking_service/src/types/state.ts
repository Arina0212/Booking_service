import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { ProfileData } from './ProfileData';
import { Cities, EventPostOutputData, EventsShortData, EventViewData, InfoForRegister, RegisterForEventOutput } from './EventData';

export type UserProcess = {
    authorizationStatus: AuthorizationStatus;
    error: string;
    email: string;
    profileData?: ProfileData;
    isProfileLoading?: boolean;
    isLoading?: boolean;
    isPhotoLoading: boolean;
    isPasswordLoading: boolean;
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
    event?: EventViewData;
    isEventLoading?: boolean;
    cities?: Cities;
    createOutput?: EventPostOutputData;
    isCreateOutputLoading?: boolean;
    registerForEvent?: RegisterForEventOutput;
    isRegisterForEventLoading?: boolean;
    filteredEvents: EventsShortData;
    isLoadingFilteredEvents?: boolean;
    infoForRegister?: InfoForRegister;
    isLoadingInfoForRegister?: boolean;
    isMember: string;
    isCancelBookingLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
