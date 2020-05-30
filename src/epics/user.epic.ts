import {
    identifiedUser,
    identifyingUser,
    identifyingUserFailed,
    updatedUser,
    updatingUser,
    updatingUserFailed,
    UserActionTypes,
    UsersAction
} from "../actions/user.action";
import {IGlobalState} from "../reducers";
import {
    combineEpics,
    Epic
} from "redux-observable";
import {isOfType} from "typesafe-actions";
import {
    map,
    startWith,
    catchError,
    filter,
    mergeMap,
} from "rxjs/operators";
import {
    from,
    of
} from "rxjs";
import {AxiosResponse} from "axios";
import IUserItem from "../models/User";
import errors from "../shared/helpers/errorHelpers";
import apiHelpers from "../shared/helpers/apiHelpers";

type UserEpic = Epic<UsersAction, UsersAction, IGlobalState>;

const identifyUserEpic: UserEpic = (action$, state$) => action$.pipe(
    filter(isOfType(UserActionTypes.IDENTIFY_USER)),
    mergeMap(action =>
        from(apiHelpers.get('users/identifyme')).pipe(
            map((response: AxiosResponse<IUserItem>) => identifiedUser(response.data)),
            startWith(identifyingUser()),
            catchError(() => of(identifyingUserFailed()))
        )
    )
);

const updateUserEpic: UserEpic = (action$, state$) => action$.pipe(
    filter(isOfType(UserActionTypes.UPDATE_USER)),
    mergeMap(action =>
        from(apiHelpers.put(`users/${action.payload.userId}`, {
            UserId : action.payload.userId,
            Email: action.payload.email,
            AcceptedNotifications : action.payload.acceptedNotifications,
            AcceptedNotifiers : action.payload.acceptedNotifiers
        })).pipe(
            map((response: AxiosResponse<IUserItem>) => updatedUser(response.data)),
            startWith(updatingUser()),
            catchError((error) => of(updatingUserFailed(errors.getErrorMessage(error))))
        )
    )
);

export default combineEpics(
    identifyUserEpic,
    updateUserEpic);