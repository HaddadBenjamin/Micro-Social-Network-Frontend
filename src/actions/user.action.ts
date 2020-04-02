export enum UserActionTypes
{
    GET_IP = 'users/getip',
    GETTING_IP = 'users/gettingip',
    GOT_IP = 'users/gotip',
    GETTING_IP_FAILED = 'users/gettingip_failed'
}

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
        ip: string
    }
}

export interface IGettingIpFailedAction
{
    type: UserActionTypes.GETTING_IP_FAILED
}

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
            ip: ip
        }
    }
}

export function gettingIpFailed(): IGettingIpFailedAction
{
    return {
        type: UserActionTypes.GETTING_IP_FAILED
    }
}

export type UsersAction =
    IGetIpAction |
    IGettingIpAction |
    IGotIpAction |
    IGettingIpFailedAction;
