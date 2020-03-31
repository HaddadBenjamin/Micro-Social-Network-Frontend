import Suggestion from "../components/Suggestions/Suggestion";

interface GetAllSuggestionsAction
{
    type : string,
    payload : Suggestion[]
}

export enum SuggestionActionTypes {
    GET_ALL_SUGGESTIONS = 'suggestions/getall',
}

export default GetAllSuggestionsAction;