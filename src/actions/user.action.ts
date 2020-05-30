import IUserItem from "../models/User";

export enum UserActionTypes
{
    IDENTIFY_USER = 'users/identifyuser',
    IDENTIFYING_USER = 'users/identifyinguser',
    IDENTIFIED_USER = "users/identifieduser",
    IDENTIFYING_USER_FAILED = "users/identifyinguser_failed",

    UPDATE_USER = 'users/updateuser',
    UPDATING_USER = 'users/updatinguser',
    UPDATED_USER = "users/updateduser",
    UPDATING_USER_FAILED = "users/updatinguser_failed",
}

//region interfaces
//region identify user
export interface IIdentifyUserAction
{
    type: UserActionTypes.IDENTIFY_USER
}

export interface IIdentifyingUserAction
{
    type: UserActionTypes.IDENTIFYING_USER
}

export interface IIdentifiedUserAction
{
    type: UserActionTypes.IDENTIFIED_USER
    payload: {
        user : IUserItem
    }
}

export interface IIdentifyingUserFailedAction
{
    type: UserActionTypes.IDENTIFYING_USER_FAILED
}
//endregion

//region update user
export interface IUpdateUserAction
{
    type : UserActionTypes.UPDATE_USER,
    payload : {
        userId : string,
        email : string,
        acceptedNotifications : string[],
        acceptedNotifiers : string[]
    }
}

export interface IUpdatingUserAction
{
    type : UserActionTypes.UPDATING_USER
}

export interface IUpdatedUserAction
{
    type : UserActionTypes.UPDATED_USER,
    payload : {
        user : IUserItem
    }
}

export interface IUpdatingUserFailedAction
{
    type : UserActionTypes.UPDATING_USER_FAILED,
    payload : {
        errorMessage : string
    }
}
//endregion
//endregion

//region implementation
//region identify user
export function identifyUser(): IIdentifyUserAction
{
    return {
        type: UserActionTypes.IDENTIFY_USER
    }
}

export function identifyingUser(): IIdentifyingUserAction
{
    return {
        type: UserActionTypes.IDENTIFYING_USER
    }
}

export function identifiedUser(user : IUserItem): IIdentifiedUserAction
{
    return {
        type: UserActionTypes.IDENTIFIED_USER,
        payload : {
            user : user
        }
    }
}

export function identifyingUserFailed(): IIdentifyingUserFailedAction
{
    return {
        type: UserActionTypes.IDENTIFYING_USER_FAILED
    }
}
//endregion

//region update user
export function updateUser(userId : string,
                           email : string,
                           acceptedNotifications : string[],
                           acceptedNotifiers : string[]) : IUpdateUserAction
{
    return {
        type : UserActionTypes.UPDATE_USER,
        payload : {
            userId : userId,
            email : email,
            acceptedNotifications : acceptedNotifications,
            acceptedNotifiers : acceptedNotifiers
        }
    }
}

export function updatingUser() : IUpdatingUserAction
{
    return {
        type : UserActionTypes.UPDATING_USER
    }
}

export function updatedUser(user : IUserItem) : IUpdatedUserAction
{
    return {
        type : UserActionTypes.UPDATED_USER,
        payload : {
            user : user
        }
    }
}

export function updatingUserFailed(errorMessage : string) : IUpdatingUserFailedAction
{
    return {
        type : UserActionTypes.UPDATING_USER_FAILED,
        payload : {
            errorMessage : errorMessage
        }
    }
}
//endregion
//endregion

export type UsersAction =
    IIdentifyUserAction |
    IIdentifyingUserAction |
    IIdentifiedUserAction |
    IIdentifyingUserFailedAction |

    IUpdateUserAction |
    IUpdatingUserAction |
    IUpdatedUserAction |
    IUpdatingUserFailedAction;
