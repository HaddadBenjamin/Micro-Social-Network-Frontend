import ApiStatus from "../models/ApiStatus";
import {
    UserActionTypes,
    UsersAction
} from "../actions/user.action";
import produce from "immer";

export interface IUserState
{
    gettingIpStatus : ApiStatus,
    ip : string
}

export const initialUserState : IUserState =
{
    gettingIpStatus : ApiStatus.LOADED,
    ip : ''
};

export default function userReducer(state : IUserState = initialUserState, action : UsersAction)
{
    return produce(state, draft =>
    {
        switch (action.type)
        {
            case UserActionTypes.GET_IP :
            case UserActionTypes.GETTING_IP :
                draft.gettingIpStatus = ApiStatus.LOADING;
                break;

            case UserActionTypes.GOT_IP :
                draft.ip = action.payload.ip;
                draft.gettingIpStatus = ApiStatus.LOADED;
                break;

            case UserActionTypes.GETTING_IP_FAILED :
                draft.gettingIpStatus = ApiStatus.FAILED;
                break;
        }
    })
}