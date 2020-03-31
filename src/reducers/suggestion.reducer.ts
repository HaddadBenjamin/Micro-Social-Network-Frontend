import Suggestion from "../components/Suggestions/Suggestion";
import GetAllSuggestionsAction, {SuggestionActionTypes} from "../actions/suggestion.action";

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

