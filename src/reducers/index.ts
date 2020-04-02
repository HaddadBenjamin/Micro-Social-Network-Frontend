import {initialItemsState, ItemState, searchItemsReducer} from "./item.reducer";
import suggestionsReducer, {initialSuggestionState, ISuggestionState} from "./suggestion.reducer";
import {combineReducers} from "redux";
import userReducer, {
    initialUserState,
    IUserState
} from "./user.reducer";

export interface IGlobalState
{
    searchItems: ItemState,
    suggestions: ISuggestionState,
    user : IUserState
}

export const initialState : IGlobalState =
{
    searchItems: initialItemsState,
    suggestions: initialSuggestionState,
    user : initialUserState
};

export default combineReducers({
    searchItems: searchItemsReducer,
    suggestions : suggestionsReducer,
    user : userReducer
});