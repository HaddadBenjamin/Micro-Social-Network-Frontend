import IUserItem from "../models/User";

export enum UserActionTypes
{
    GET_IP = 'users/getip',
    GETTING_IP = 'users/gettingip',
    GOT_IP = 'users/gotip',
    GETTING_IP_FAILED = 'users/gettingip_failed',

    CREATE_USER = 'users/createuser',
    CREATING_USER = 'users/creatinguser',
    CREATED_USER = "users/createduser",
    CREATING_USER_FAILED = "users/creatinguser_failed",

    UPDATE_USER = 'users/updateuser',
    UPDATING_USER = 'users/updatinguser',
    UPDATED_USER = "users/updateduser",
    UPDATING_USER_FAILED = "users/updatinguser_failed",
}

//region interfaces
//region get ip
export interface IGetIpAction
{
    type: UserActionTypes.GET_IP
}

export interface IGettingIpAction
{
    type: UserActionTypes.GETTING_IP
}

export interface IGotIpAction
{
    type: UserActionTypes.GOT_IP
    payload: {
        ip : string
    }
}

export interface IGettingIpFailedAction
{
    type: UserActionTypes.GETTING_IP_FAILED
}
//endregion

//region create user
export interface ICreateUserAction
{
    type : UserActionTypes.CREATE_USER,
    payload : {
        id : string,
        email : string
    }
}

export interface ICreatingUserAction
{
    type : UserActionTypes.CREATING_USER
}

export interface ICreatedUserAction
{
    type : UserActionTypes.CREATED_USER,
    payload : {
        user : IUserItem
    }
}

export interface ICreatingUserFailedAction
{
    type : UserActionTypes.CREATING_USER_FAILED
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
    type : UserActionTypes.UPDATING_USER_FAILED
}
//endregion
//endregion

//region implementation
//region get ip
export function getIp(): IGetIpAction
{
    return {
        type: UserActionTypes.GET_IP
    }
}

export function gettingIp(): IGettingIpAction
{
    return {
        type: UserActionTypes.GETTING_IP
    }
}

export function gotIp(ip : string): IGotIpAction
{
    return {
        type: UserActionTypes.GOT_IP,
        payload : {
            ip : ip
        }
    }
}

export function gettingIpFailed(): IGettingIpFailedAction
{
    return {
        type: UserActionTypes.GETTING_IP_FAILED
    }
}
//endregion

//region create user
export function createUser(id : string, email : string) : ICreateUserAction
{
    return {
        type : UserActionTypes.CREATE_USER,
        payload : {
            id : id,
            email : email
        }
    }
}

export function creatingUser() : ICreatingUserAction
{
    return {
        type : UserActionTypes.CREATING_USER
    }
}

export function createdUser(user : IUserItem) : ICreatedUserAction
{
    return {
        type : UserActionTypes.CREATED_USER,
        payload : {
            user : user
        }
    }
}

export function creatingUserFailed() : ICreatingUserFailedAction
{
    return {
        type : UserActionTypes.CREATING_USER_FAILED
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
//endregion
//endregion

export type UsersAction =
    IGetIpAction |
    IGettingIpAction |
    IGotIpAction |
    IGettingIpFailedAction |

    ICreateUserAction |
    ICreatingUserAction |
    ICreatedUserAction |
    ICreatingUserFailedAction |

    IUpdateUserAction |
    IUpdatingUserAction |
    IUpdatedUserAction |
    IUpdatingUserFailedAction;
