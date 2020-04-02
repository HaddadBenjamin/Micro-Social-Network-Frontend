import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import rootReducer from "../reducers";

export const rootEpic = combineEpics(
);

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
