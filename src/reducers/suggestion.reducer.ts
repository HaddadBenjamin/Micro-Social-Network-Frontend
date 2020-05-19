import ApiStatus from "../shared/models/ApiStatus";
import Suggestion from "../models/Suggestion";
import {
    SuggestionActionTypes,
    SuggestionsAction
} from "../actions/suggestion.action";
import produce from "immer";
import {
    filter,
    findIndex
} from "lodash";

export const initialSuggestionState: ISuggestionState = {
    creatingASuggestionStatus: ApiStatus.LOADED,
    gettingAllSuggestionsStatus: ApiStatus.LOADING,
    votingToASuggestionStatus: ApiStatus.LOADED,
    commentingASuggestionStatus: ApiStatus.LOADED,
    deletingASuggestionStatus: ApiStatus.LOADED,
    deletingACommentFromASuggestionStatus: ApiStatus.LOADED,
    suggestions: []
}

export interface ISuggestionState {
    creatingASuggestionStatus: ApiStatus;
    gettingAllSuggestionsStatus: ApiStatus;
    votingToASuggestionStatus: ApiStatus;
    commentingASuggestionStatus: ApiStatus;
    deletingASuggestionStatus: ApiStatus;
    deletingACommentFromASuggestionStatus: ApiStatus;
    suggestions: Suggestion[];
}

export default function suggestionsReducer(state : ISuggestionState = initialSuggestionState, action : SuggestionsAction)
{
    return produce(state, draft =>{
        switch (action.type) {
            //region Get all suggestions
            case SuggestionActionTypes.GET_ALL_SUGGESTIONS :
            case SuggestionActionTypes.GETTING_ALL_SUGGESTIONS :
                draft.gettingAllSuggestionsStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.GETTING_ALL_SUGGESTIONS_FAILED :
                draft.gettingAllSuggestionsStatus = ApiStatus.FAILED;
                break;

            case SuggestionActionTypes.GOT_ALL_SUGGESTIONS :
                draft.suggestions = action.payload.suggestions;
                draft.gettingAllSuggestionsStatus = ApiStatus.LOADED;
                break;
            //endregion

            //region Create a suggestion
            case SuggestionActionTypes.CREATE_SUGGESTION :
            case SuggestionActionTypes.CREATING_SUGGESTION :
                draft.creatingASuggestionStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.CREATING_SUGGESTION_FAILED :
                draft.creatingASuggestionStatus = ApiStatus.FAILED;
                break;

            case SuggestionActionTypes.CREATED_SUGGESTION :
                draft.suggestions.push(action.payload.suggestion);
                draft.creatingASuggestionStatus = ApiStatus.LOADED;
                break;
            //endregion

            //region Add a vote to a suggestion
            case SuggestionActionTypes.ADD_VOTE :
            case SuggestionActionTypes.ADDING_VOTE :
                draft.votingToASuggestionStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.ADDING_VOTE_FAILED :
                draft.votingToASuggestionStatus = ApiStatus.FAILED;
                break;

            case SuggestionActionTypes.ADDED_VOTE :
                const suggestionToUpdate = action.payload.suggestion;
                // @ts-ignore
                const suggestionToUpdateIndex = findIndex(draft.suggestions, function(suggestion : Suggestion) { return suggestion.Id === suggestionToUpdate.Id; });

                if (suggestionToUpdateIndex !== -1)
                    draft.suggestions[suggestionToUpdateIndex] = suggestionToUpdate;

                draft.votingToASuggestionStatus = ApiStatus.LOADED;
                break;
            //endregion

            //region Add a comment to a suggestion
            case SuggestionActionTypes.ADD_COMMENT :
            case SuggestionActionTypes.ADDING_COMMENT :
                draft.commentingASuggestionStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.ADDED_COMMENT :
                // @ts-ignore
                draft.suggestions = filter(draft.suggestions, function(suggestion : Suggestion) { return suggestion.Id !== action.payload.suggestion.Id; });
                draft.suggestions.push(action.payload.suggestion);
                draft.commentingASuggestionStatus = ApiStatus.LOADED;
                break;

            case SuggestionActionTypes.ADDING_COMMENT_FAILED :
                draft.commentingASuggestionStatus = ApiStatus.FAILED;
                break;
            //endregion

            //region Delete a suggestion
            case SuggestionActionTypes.DELETE_SUGGESTION :
            case SuggestionActionTypes.DELETING_SUGGESTION :
                draft.deletingASuggestionStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.DELETED_SUGGESTION :
                // @ts-ignore
                draft.suggestions = filter(draft.suggestions, function(suggestion : Suggestion) { return suggestion.Id !== action.payload.suggestionId; });
                draft.deletingASuggestionStatus = ApiStatus.LOADED;
                break;

            case SuggestionActionTypes.DELETING_SUGGESTION_FAILED :
                draft.deletingASuggestionStatus = ApiStatus.FAILED;
                break;
            //endregion

            //region Delete a comment from a suggestion
            case SuggestionActionTypes.DELETE_COMMENT :
            case SuggestionActionTypes.DELETING_COMMENT :
                draft.deletingACommentFromASuggestionStatus = ApiStatus.LOADING;
                break;

            case SuggestionActionTypes.DELETED_COMMENT :
                // @ts-ignore
                draft.suggestions = filter(draft.suggestions, function(suggestion : Suggestion) { return suggestion.Id !== action.payload.suggestion.Id; });
                draft.suggestions.push(action.payload.suggestion);
                draft.deletingACommentFromASuggestionStatus = ApiStatus.LOADED;
                break;

            case SuggestionActionTypes.DELETING_COMMENT_FAILED :
                draft.deletingACommentFromASuggestionStatus = ApiStatus.FAILED;
                break;
            //endregion
        }
    })
}