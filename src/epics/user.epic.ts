import {
    createdUser,
    creatingUser,
    creatingUserFailed,
    gettingIp,
    gettingIpFailed,
    gotIp,
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
    switchMap,
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
import axios from 'axios'
import {
    SuggestionActionTypes
} from "../actions/suggestion.action";
import apiHelpers from "../shared/helpers/apiHelpers";

type UserEpic = Epic<UsersAction, UsersAction, IGlobalState>;


const getIpEpic: UserEpic = (action$, state$) => action$.pipe(
    filter(isOfType(SuggestionActionTypes.GET_ALL_SUGGESTIONS)),
    switchMap(action =>
        from(axios.get<string>('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text')).pipe(
            map((response: AxiosResponse<string>) => gotIp(response.data)),
            startWith(gettingIp()),
            catchError(() => of(gettingIpFailed()))
        )
    )
);

const gettingIpFailedEpic: UserEpic = (action$, state$) => action$.pipe(
    filter(isOfType(UserActionTypes.GETTING_IP_FAILED)),
    switchMap(action =>
        from(axios.get<string>('https://cors-anywhere.herokuapp.com/http://api.ipify.org/?format=text')).pipe(
            map((response: AxiosResponse<string>) => gotIp(response.data)),
            startWith(gettingIp()),
            catchError(() => of(gettingIpFailed()))
        )
    )
);

const createUserEpic: UserEpic = (action$, state$) => action$.pipe(
    filter(isOfType(UserActionTypes.CREATE_USER)),
    mergeMap(action =>
        from(apiHelpers.post('users', {
            UserId : action.payload.id,
            Email: action.payload.email
        })).pipe(
            map((response: AxiosResponse<IUserItem>) => createdUser(response.data)),
            startWith(creatingUser()),
            catchError(() => of(creatingUserFailed()))
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
    getIpEpic,
    gettingIpFailedEpic,
    createUserEpic,
    updateUserEpic);