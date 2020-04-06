import ApiStatus from "../models/ApiStatus";
import {
    UserActionTypes,
    UsersAction
} from "../actions/user.action";
import produce from "immer";
import crypto from 'crypto';

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
                var shasum = crypto.createHash('sha1');

                shasum.update(action.payload.ip);

                draft.userId = shasum.digest('hex');
                draft.gettingIpStatus = ApiStatus.LOADED;
                break;

            case UserActionTypes.GETTING_IP_FAILED :
                draft.gettingIpStatus = ApiStatus.FAILED;
                break;
        }
    })
}