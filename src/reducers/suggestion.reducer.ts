import Suggestion from "src/components/Suggestions/Suggestion";
import GetAllSuggestionsAction from "src/actions/suggestion.action";
import {SuggestionActionTypes} from "src/actions/item.action";

export interface GetAllSuggestionsState
{
    suggestions : Suggestion[]
}

const initialState : GetAllSuggestionsState =
{
    suggestions : []
};

export const getAllSuggestionReducer = (suggestionState: GetAllSuggestionsState = initialState, action: GetAllSuggestionsAction) =>
{
    switch (action.type) {
        case SuggestionActionTypes.GET_ALL_SUGGESTIONS:
            return {
                ...initialState.suggestions,
                suggestions : action.payload || []
            };

        default:
            return suggestionState;
    }
};

