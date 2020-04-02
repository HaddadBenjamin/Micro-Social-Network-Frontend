import ApiStatus from "../models/ApiStatus";
import ISuggestionItem from "../models/Suggestion";
import {SuggestionActionTypes, SuggestionsAction} from "../actions/suggestion.action";
import produce from "immer";
import {findIndex} from "lodash";

export const initialSuggestionState: ISuggestionState = {
    gettingAllSuggestionsStatus: ApiStatus.LOADING,
    votingToASuggestionStatus: ApiStatus.LOADED,
    creatingASuggestionStatus: ApiStatus.LOADED,
    suggestions: []
}

export interface ISuggestionState {
    gettingAllSuggestionsStatus: ApiStatus;
    votingToASuggestionStatus: ApiStatus;
    creatingASuggestionStatus: ApiStatus;
    suggestions: ISuggestionItem[];
}

export default function suggestionsReducer(state : ISuggestionState = initialSuggestionState, action : SuggestionsAction)
{
    return produce(state, draft =>{
        switch (action.type) {
            case SuggestionActionTypes.GET_ALL_SUGGESTIONS :
            case SuggestionActionTypes.GETTING_ALL_SUGGESTIONS :
                draft.gettingAllSuggestionsStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.GETTING_ALL_SUGGESTIONS_FAILED :
                draft.gettingAllSuggestionsStatus = ApiStatus.FAILED;
                break;

            case SuggestionActionTypes.GOT_ALL_SUGGESTIONS :
                draft.gettingAllSuggestionsStatus = ApiStatus.LOADED;
                draft.suggestions = action.payload.suggestions;
                break;

            case SuggestionActionTypes.CREATE_SUGGESTION :
            case SuggestionActionTypes.CREATING_SUGGESTION :
                draft.creatingASuggestionStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.CREATING_SUGGESTION_FAILED :
                draft.creatingASuggestionStatus = ApiStatus.FAILED;
                break;

            case SuggestionActionTypes.CREATED_SUGGESTION :
                draft.suggestions.push(action.payload.suggestion);
                break;

            case SuggestionActionTypes.ADD_VOTE :
            case SuggestionActionTypes.ADDING_VOTE :
                draft.votingToASuggestionStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.ADDING_VOTE_FAILED :
                draft.votingToASuggestionStatus = ApiStatus.FAILED;
                break;

            case SuggestionActionTypes.ADDED_VOTE :
                const suggestionToUpdate = action.payload.suggestion;
                const suggestionToUpdateIndex = findIndex(draft.suggestions, function(suggestion : ISuggestionItem) { return suggestion.Id == suggestionToUpdate.Id; });

                if (suggestionToUpdateIndex !== -1)
                    draft.suggestions[suggestionToUpdateIndex] = suggestionToUpdate;

                draft.votingToASuggestionStatus = ApiStatus.LOADED;
                break;
        }
    })
}