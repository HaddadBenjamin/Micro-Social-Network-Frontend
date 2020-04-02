import {
    combineEpics,
    createEpicMiddleware,
} from 'redux-observable';
import suggestionEpics from './suggestion.epic'
import userEpics from './user.epic'
import {IGlobalState} from "../reducers";
import {ApplicationAction} from "../actions";

export const rootEpic = combineEpics(suggestionEpics, userEpics);

export default createEpicMiddleware<ApplicationAction, ApplicationAction, IGlobalState>();