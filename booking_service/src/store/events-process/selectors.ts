import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { EventShortData, EventsShortData } from '../../types/EventData';

export const getAllEvents = (state: Pick<State, NameSpace.Event>): EventsShortData | undefined => state[NameSpace.Event].allEvents;
export const getLoadingAllEvents = (state: Pick<State, NameSpace.Event>): boolean | undefined => state[NameSpace.Event].isEventsLoading;
export const getEvent = (state: Pick<State, NameSpace.Event>): EventShortData | undefined => state[NameSpace.Event].event;
export const getLoadingEvent = (state: Pick<State, NameSpace.Event>): boolean | undefined => state[NameSpace.Event].isEventLoading;
