import { combineEpics, createEpicMiddleware } from 'redux-observable';
import suggestionEpics from './suggestion.epic'

export const rootEpic = combineEpics(suggestionEpics);

export default createEpicMiddleware();