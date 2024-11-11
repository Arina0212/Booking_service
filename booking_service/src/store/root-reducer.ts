import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process';
import { eventProcess } from './events-process/events-process';

export const rootReducer = combineReducers({
    [NameSpace.User]: userProcess.reducer,
    [NameSpace.Event]: eventProcess.reducer,
});
