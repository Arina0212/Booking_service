import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { EventProcess } from '../../types/state';
import { fetchAllEventsData, fetchEventData } from '../api-actions';

const initialState: EventProcess = {
    allEvents: [],
    isEventsLoading: true,
    event: undefined,
    isEventLoading: true,
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
            });
    },
});
