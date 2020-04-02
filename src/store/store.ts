import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import {ItemState, searchItemsReducer} from "../reducers/item.reducer";

export interface GlobalState
{
    searchItems : ItemState
}
export const rootReducer = combineReducers({
    searchItems : searchItemsReducer
});
export const rootEpic = combineEpics(
);

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
