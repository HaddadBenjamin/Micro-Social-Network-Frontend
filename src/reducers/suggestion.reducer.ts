import ApiStatus from "../models/ApiStatus";
import ISuggestionItem from "../models/Suggestion";
import {SuggestionsAction} from "../actions/suggestion.action";
import produce from "immer";

export const initialSuggestionState: ISuggestionState = {
    getAllSuggestionsStatus: ApiStatus.LOADING,
    votingToASuggestionStatus: ApiStatus.LOADED,
    createASuggestion: ApiStatus.LOADED,
    suggestions: []
}

export interface ISuggestionState {
    getAllSuggestionsStatus: ApiStatus;
    votingToASuggestionStatus: ApiStatus;
    createASuggestion: ApiStatus;
    suggestions: ISuggestionItem[];
}

export default function suggestionsReducer(state : ISuggestionState = initialSuggestionState, action : SuggestionsAction)
{
    return produce(state, draft =>{
         {

        }
    })
}