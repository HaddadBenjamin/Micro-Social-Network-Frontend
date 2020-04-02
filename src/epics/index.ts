import {
    combineEpics,
    createEpicMiddleware,
} from 'redux-observable';
import suggestionEpics from './suggestion.epic'
import {SuggestionsAction} from "../actions/suggestion.action";
import {IGlobalState} from "../reducers";

export const rootEpic = combineEpics(suggestionEpics);

export default createEpicMiddleware<SuggestionsAction, SuggestionsAction, IGlobalState>();