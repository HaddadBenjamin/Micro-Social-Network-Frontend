import ApiStatus from "../models/ApiStatus";
import {
    UserActionTypes,
    UsersAction
} from "../actions/user.action";
import produce from "immer";
import strings from '../shared/utilities/strings'
export interface IUserState
{
    gettingIpStatus : ApiStatus,
    userId : string
}

export const initialUserState : IUserState =
{
    gettingIpStatus : ApiStatus.LOADED,
    userId : ''
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
                draft.userId = strings.hashcode(action.payload.ip).toString();
                draft.gettingIpStatus = ApiStatus.LOADED;
                break;

            case UserActionTypes.GETTING_IP_FAILED :
                draft.gettingIpStatus = ApiStatus.FAILED;
                break;
        }
    })
}