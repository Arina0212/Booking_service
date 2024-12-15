import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { EventProcess } from '../../types/state';
import {
    fetchAllEventsData,
    fetchCitiesData,
    fetchEventData,
    fetchMyEventsData,
    fetchOtherEventsData,
    fetchParticipateEventsData,
    postEventDataAction,
    registerForEvent,
} from '../api-actions';

const initialState: EventProcess = {
    allEvents: [],
    isEventsLoading: true,
    event: undefined,
    isEventLoading: true,
    myEvents: [],
    isMyEventsLoading: true,
    participateEvents: [],
    isParticipateEventsLoading: true,
    otherEvents: [],
    isOtherEventsLoading: true,
    cities: undefined,
    createOutput: undefined,
    isCreateOutputLoading: true,
    isRegisterForEventLoading: true,
    registerForEvent: undefined,
};

export const eventProcess = createSlice({
    name: NameSpace.Event,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllEventsData.pending, (state) => {
                state.isEventsLoading = true;
            })
            .addCase(fetchAllEventsData.fulfilled, (state, action) => {
                state.allEvents = action.payload;
                state.isEventsLoading = false;
            })
            .addCase(fetchEventData.pending, (state) => {
                state.isEventLoading = true;
            })
            .addCase(fetchEventData.fulfilled, (state, action) => {
                state.event = action.payload;
                state.isEventLoading = false;
            })
            .addCase(fetchMyEventsData.pending, (state) => {
                state.isMyEventsLoading = true;
            })
            .addCase(fetchMyEventsData.fulfilled, (state, action) => {
                state.myEvents = action.payload;
                state.isMyEventsLoading = false;
            })
            .addCase(fetchParticipateEventsData.pending, (state) => {
                state.isParticipateEventsLoading = true;
            })
            .addCase(fetchParticipateEventsData.fulfilled, (state, action) => {
                state.participateEvents = action.payload;
                state.isParticipateEventsLoading = false;
            })
            .addCase(fetchOtherEventsData.pending, (state) => {
                state.isOtherEventsLoading = true;
            })
            .addCase(fetchOtherEventsData.fulfilled, (state, action) => {
                state.otherEvents = action.payload;
                state.isOtherEventsLoading = false;
            })
            .addCase(fetchCitiesData.fulfilled, (state, action) => {
                state.cities = action.payload;
            })
            .addCase(postEventDataAction.pending, (state) => {
                state.isCreateOutputLoading = true;
            })
            .addCase(postEventDataAction.fulfilled, (state, action) => {
                state.createOutput = action.payload;
                state.isCreateOutputLoading = false;
            })
            .addCase(registerForEvent.pending, (state) => {
                state.isRegisterForEventLoading = true;
            })
            .addCase(registerForEvent.fulfilled, (state, action) => {
                state.registerForEvent = action.payload;
                state.isRegisterForEventLoading = false;
            });
    },
});
