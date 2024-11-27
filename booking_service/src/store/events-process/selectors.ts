import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { Cities, EventShortData, EventsShortData } from '../../types/EventData';

export const getAllEvents = (state: Pick<State, NameSpace.Event>): EventsShortData | undefined => state[NameSpace.Event].allEvents;
export const getLoadingAllEvents = (state: Pick<State, NameSpace.Event>): boolean | undefined => state[NameSpace.Event].isEventsLoading;
export const getEvent = (state: Pick<State, NameSpace.Event>): EventShortData | undefined => state[NameSpace.Event].event;
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
