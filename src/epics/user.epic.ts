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
import publicIp from "public-ip";
import api from "../shared/utilities/api";
import {AxiosResponse} from "axios";
import IUserItem from "../models/User";

type UserEpic = Epic<UsersAction, UsersAction, IGlobalState>;

const getIpEpic: UserEpic = (action$, state$) => action$.pipe(
    filter(isOfType(UserActionTypes.GET_IP)),
    switchMap(action =>
        from(publicIp.v4()).pipe(
            map((ip: string) => gotIp(ip)),
            startWith(gettingIp()),
            catchError(() => of(gettingIpFailed()))
        )
    )
);

const createUserEpic: UserEpic = (action$, state$) => action$.pipe(
    filter(isOfType(UserActionTypes.CREATE_USER)),
    mergeMap(action =>
        from(api.post('users', {
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
        from(api.put('users', {
            UserId : action.payload.userId,
            Email: action.payload.email,
            AcceptedNotifications : action.payload.acceptedNotifications,
            AcceptedNotifiers : action.payload.acceptedNotifiers
        })).pipe(
            map((response: AxiosResponse<IUserItem>) => updatedUser(response.data)),
            startWith(updatingUser()),
            catchError(() => of(updatingUserFailed()))
        )
    )
);

export default combineEpics(
    getIpEpic,
    createUserEpic,
    updateUserEpic);