import {
    gettingIp,
    gettingIpFailed,
    gotIp,
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
} from "rxjs/operators";
import {
    from,
    of
} from "rxjs";
import publicIp from "public-ip";

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

export default combineEpics(getIpEpic);