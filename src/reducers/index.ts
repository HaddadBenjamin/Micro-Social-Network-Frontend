import itemsReducer, {
    IItemState,
    initialItemsState
} from "./item.reducer";
import suggestionsReducer, {initialSuggestionState, ISuggestionState} from "./suggestion.reducer";
import {combineReducers} from "redux";
import userReducer, {
    initialUserState,
    IUserState
} from "./user.reducer";

export interface IGlobalState
{
    items: IItemState,
    suggestions: ISuggestionState,
    user : IUserState
}

export const initialState : IGlobalState =
{
    items: initialItemsState,
    suggestions: initialSuggestionState,
    user : initialUserState
};

export default combineReducers({
    items: itemsReducer,
    suggestions : suggestionsReducer,
    user : userReducer
});