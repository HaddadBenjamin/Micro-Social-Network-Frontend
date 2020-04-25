import ApiStatus from "../models/ApiStatus";
import {
    UserActionTypes,
    UsersAction
} from "../actions/user.action";
import produce from "immer";
import crypto from 'crypto';
import IUserItem from "../models/User";

export interface IUserState
{
    gettingIpStatus : ApiStatus,
    creatingUserStatus : ApiStatus,
    updatingUserStatus : ApiStatus,
    user? : IUserItem,
    userId : string,
    errorMessage : string
}

export const initialUserState : IUserState =
{
    gettingIpStatus : ApiStatus.LOADED,
    creatingUserStatus : ApiStatus.LOADED,
    updatingUserStatus : ApiStatus.LOADED,
    user : undefined,
    userId : '',
    errorMessage : ''
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

            case UserActionTypes.CREATE_USER :
            case UserActionTypes.CREATING_USER :
                draft.creatingUserStatus = ApiStatus.LOADING;
                break;

            case UserActionTypes.CREATED_USER :
                draft.user = action.payload.user;
                draft.creatingUserStatus = ApiStatus.LOADED;
                break;

            case UserActionTypes.CREATING_USER_FAILED :
                draft.creatingUserStatus = ApiStatus.LOADED;
                break;

            case UserActionTypes.UPDATE_USER :
            case UserActionTypes.UPDATING_USER :
                draft.updatingUserStatus = ApiStatus.LOADING;
                break;

            case UserActionTypes.UPDATED_USER :
                draft.user = action.payload.user;
                draft.updatingUserStatus = ApiStatus.LOADED;
                break;

            case UserActionTypes.UPDATING_USER_FAILED :
                draft.updatingUserStatus = ApiStatus.FAILED;
                draft.errorMessage = action.payload.errorMessage;
                break;
        }
    })
}