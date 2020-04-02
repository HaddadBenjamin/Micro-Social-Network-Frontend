import {initialItemsState, ItemState, searchItemsReducer} from "./item.reducer";
import suggestionsReducer, {initialSuggestionState, ISuggestionState} from "./suggestion.reducer";
import {combineReducers} from "redux";

export interface IGlobalState
{
    searchItems: ItemState,
    suggestions: ISuggestionState
}

export const initialState : IGlobalState =
{
    searchItems: initialItemsState,
    suggestions: initialSuggestionState
};

export default combineReducers({
    searchItems: searchItemsReducer,
    suggestions : suggestionsReducer
});