import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { EventProcess } from '../../types/state';
import {
    cancelEvent,
    deleteBooking,
    editEventDataAction,
    fetchAllEventsData,
    fetchCitiesData,
    fetchEventData,
    fetchIsMember,
    fetchListMembers,
    fetchMyEventsData,
    fetchOtherEventsData,
    fetchParticipateEventsData,
    getInfoRegisterForEvent,
    postEventDataAction,
    postFiltersAction,
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
    isCreateOutputLoading: false,
    isRegisterForEventLoading: false,
    registerForEvent: undefined,
    filteredEvents: [],
    isLoadingFilteredEvents: true,
    infoForRegister: undefined,
    isLoadingInfoForRegister: true,
    isMember: '',
    isCancelBookingLoading: false,
    isCancelEventLoading: false,
    listOfMembers: undefined,
    isListOfMembersLoading: false,
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
            .addCase(postEventDataAction.rejected, (state) => {
                state.isCreateOutputLoading = false;
            })
            .addCase(postEventDataAction.fulfilled, (state, action) => {
                state.createOutput = action.payload;
                state.isCreateOutputLoading = false;
            })
            .addCase(editEventDataAction.pending, (state) => {
                state.isCreateOutputLoading = true;
            })
            .addCase(editEventDataAction.rejected, (state) => {
                state.isCreateOutputLoading = false;
            })
            .addCase(editEventDataAction.fulfilled, (state, action) => {
                state.createOutput = action.payload;
                state.isCreateOutputLoading = false;
            })
            .addCase(registerForEvent.pending, (state) => {
                state.isRegisterForEventLoading = true;
            })
            .addCase(registerForEvent.rejected, (state) => {
                state.isRegisterForEventLoading = false;
            })
            .addCase(registerForEvent.fulfilled, (state, action) => {
                state.registerForEvent = action.payload;
                state.isRegisterForEventLoading = false;
            })
            .addCase(postFiltersAction.fulfilled, (state, action) => {
                state.filteredEvents = action.payload;
                state.isLoadingFilteredEvents = false;
            })
            .addCase(getInfoRegisterForEvent.pending, (state) => {
                state.isLoadingInfoForRegister = true;
            })
            .addCase(getInfoRegisterForEvent.fulfilled, (state, action) => {
                state.infoForRegister = action.payload;
                state.isLoadingInfoForRegister = false;
            })
            .addCase(fetchIsMember.fulfilled, (state, action) => {
                state.isMember = action.payload;
            })
            .addCase(deleteBooking.pending, (state) => {
                state.isCancelBookingLoading = true;
            })
            .addCase(deleteBooking.rejected, (state) => {
                state.isCancelBookingLoading = false;
            })
            .addCase(deleteBooking.fulfilled, (state) => {
                state.isCancelBookingLoading = false;
            })
            .addCase(cancelEvent.pending, (state) => {
                state.isCancelEventLoading = true;
            })
            .addCase(cancelEvent.rejected, (state) => {
                state.isCancelEventLoading = false;
            })
            .addCase(cancelEvent.fulfilled, (state) => {
                state.isCancelEventLoading = false;
            })
            .addCase(fetchListMembers.pending, (state) => {
                state.isListOfMembersLoading = true;
            })
            .addCase(fetchListMembers.rejected, (state) => {
                state.isListOfMembersLoading = false;
            })
            .addCase(fetchListMembers.fulfilled, (state, action) => {
                state.listOfMembers = action.payload;
                state.isListOfMembersLoading = false;
            });
    },
});
