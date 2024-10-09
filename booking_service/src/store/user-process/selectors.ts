import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus =>
    state[NameSpace.User].authorizationStatus;
export const getError = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].error;
export const getEmailError = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].email;
