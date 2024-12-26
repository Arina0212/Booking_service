import { State } from '../../types/state';
import { NameSpace } from '../../const';
import {
    Cities,
    EventPostOutputData,
    EventsShortData,
    EventViewData,
    InfoForRegister,
    RegisterForEventOutput,
} from '../../types/EventData';

export const getAllEvents = (state: Pick<State, NameSpace.Event>): EventsShortData | undefined => state[NameSpace.Event].allEvents;
export const getLoadingAllEvents = (state: Pick<State, NameSpace.Event>): boolean | undefined => state[NameSpace.Event].isEventsLoading;
export const getEvent = (state: Pick<State, NameSpace.Event>): EventViewData | undefined => state[NameSpace.Event].event;
export const getLoadingEvent = (state: Pick<State, NameSpace.Event>): boolean | undefined => state[NameSpace.Event].isEventLoading;

export const getMyEvents = (state: Pick<State, NameSpace.Event>): EventsShortData | undefined => state[NameSpace.Event].myEvents;
export const getLoadingMyEvents = (state: Pick<State, NameSpace.Event>): boolean | undefined => state[NameSpace.Event].isMyEventsLoading;

export const getParticipateEvents = (state: Pick<State, NameSpace.Event>): EventsShortData | undefined =>
    state[NameSpace.Event].participateEvents;
export const getLoadingParticipateEvents = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isParticipateEventsLoading;

export const getOtherEvents = (state: Pick<State, NameSpace.Event>): EventsShortData | undefined => state[NameSpace.Event].otherEvents;
export const getLoadingOtherEvents = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isOtherEventsLoading;

export const getCities = (state: Pick<State, NameSpace.Event>): Cities | undefined => state[NameSpace.Event].cities;

export const geOutputMessage = (state: Pick<State, NameSpace.Event>): EventPostOutputData | undefined =>
    state[NameSpace.Event].createOutput;
export const getLoadingOutputMessage = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isCreateOutputLoading;
export const getLoadingRegisterForEvent = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isRegisterForEventLoading;
export const getRegisterForEventMessedge = (state: Pick<State, NameSpace.Event>): RegisterForEventOutput | undefined =>
    state[NameSpace.Event].registerForEvent;
export const getFilteredEvents = (state: Pick<State, NameSpace.Event>): EventsShortData | undefined =>
    state[NameSpace.Event].filteredEvents;
export const getLoadingFilteredEvents = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isLoadingFilteredEvents;

export const getInfoForRegister = (state: Pick<State, NameSpace.Event>): InfoForRegister | undefined =>
    state[NameSpace.Event].infoForRegister;

export const getLoadingInfoForRegister = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isLoadingInfoForRegister;
export const getIsMember = (state: Pick<State, NameSpace.Event>): string | undefined => state[NameSpace.Event].isMember;
export const getIsCancelBookingLoading = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isCancelBookingLoading;
export const getIsCancelEventLoading = (state: Pick<State, NameSpace.Event>): boolean | undefined =>
    state[NameSpace.Event].isCancelEventLoading;
