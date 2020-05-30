import ApiStatus from "../shared/models/ApiStatus";
import {
    UserActionTypes,
    UsersAction
} from "../actions/user.action";
import produce from "immer";
import crypto from 'crypto';
import IUserItem from "../models/User";

export interface IUserState
{
    identifyingUserStatus : ApiStatus,
    updatingUserStatus : ApiStatus,
    user : IUserItem,
    userId : string,
    errorMessage : string
}

export const initialUserState : IUserState =
{
    identifyingUserStatus : ApiStatus.LOADED,
    updatingUserStatus : ApiStatus.LOADED,
    user : {
        Id : '',
        Email : '',
        NotificationSetting : {
            Id : '',
            AcceptedNotifications : [],
            AcceptedNotifiers : [],
            UserNotifications : []
        }
    },
    userId : '',
    errorMessage : ''
};

export default function userReducer(state : IUserState = initialUserState, action : UsersAction)
{
    return produce(state, draft =>
    {
        switch (action.type)
        {
            case UserActionTypes.IDENTIFY_USER :
            case UserActionTypes.IDENTIFYING_USER :
                draft.identifyingUserStatus = ApiStatus.LOADING;
                break;

            case UserActionTypes.IDENTIFIED_USER :
                draft.user = action.payload.user;
                draft.userId = draft.user.Id;
                draft.identifyingUserStatus = ApiStatus.LOADED;
                break;

            case UserActionTypes.IDENTIFYING_USER_FAILED :
                draft.identifyingUserStatus = ApiStatus.FAILED;
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