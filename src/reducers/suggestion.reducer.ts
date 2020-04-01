import ISuggestionItem from "../components/Suggestions/ISuggestionItem";
import GetAllSuggestionsAction, {SuggestionActionTypes} from "../actions/suggestion.action";

export interface GetAllSuggestionsState
{
    suggestions : ISuggestionItem[]
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

