import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { ProfileData } from '../../types/ProfileData';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus =>
    state[NameSpace.User].authorizationStatus;
export const getError = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].error;
export const getEmailError = (state: Pick<State, NameSpace.User>): string => state[NameSpace.User].email;
export const getProfile = (state: Pick<State, NameSpace.User>): ProfileData | undefined => state[NameSpace.User].profileData;
export const getLoadingProfile = (state: Pick<State, NameSpace.User>): boolean | undefined => state[NameSpace.User].isProfileLoading;
