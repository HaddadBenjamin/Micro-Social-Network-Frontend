import ISuggestionItem from "../models/Suggestion";

export enum SuggestionActionTypes
{
    GET_ALL_SUGGESTIONS = 'suggestions/getall',
    GETTING_ALL_SUGGESTIONS = 'suggestions/gettingall',
    GOT_ALL_SUGGESTIONS = 'suggestions/gotall',
    GETTING_ALL_SUGGESTIONS_FAILED = 'suggestions/gettingall_failed',

    CREATE_SUGGESTION = 'suggestions/create',
    CREATING_SUGGESTION = 'suggestions/creating',
    CREATED_SUGGESTION = 'suggestions/created',
    CREATING_SUGGESTION_FAILED = 'suggestions/creating_failed',

    ADD_VOTE = 'suggestions/vote',
    ADDING_VOTE = 'suggestions/voting',
    ADDED_VOTE = 'suggestions/voted',
    ADDING_VOTE_FAILED = 'suggestions/voting_failed',
}

export interface IGetAllSuggestionsAction
{
    type: SuggestionActionTypes.GET_ALL_SUGGESTIONS;
}

export interface IGettingAllSuggestionsAction
{
    type: SuggestionActionTypes.GETTING_ALL_SUGGESTIONS;
}

export interface IGotAllSuggestionsAction
{
    type: SuggestionActionTypes.GOT_ALL_SUGGESTIONS;
    payload: {
        suggestions: ISuggestionItem[]
    }
}

export interface IGettingAllSuggestionsFailedAction
{
    type: SuggestionActionTypes.GETTING_ALL_SUGGESTIONS_FAILED;
}

export interface ICreateSuggestionAction
{
    type : SuggestionActionTypes.CREATE_SUGGESTION,
    payload : {
        content : string
    }
}

export interface ICreatingSuggestionAction
{
    type : SuggestionActionTypes.CREATING_SUGGESTION
}

export interface ICreatedSuggestionAction
{
    type : SuggestionActionTypes.CREATED_SUGGESTION,
    payload : {
        suggestion : ISuggestionItem
    }
}

export interface ICreatingSuggestionFailedAction
{
    type : SuggestionActionTypes.CREATING_SUGGESTION_FAILED
}

export interface IAddVoteAction
{
    type : SuggestionActionTypes.ADD_VOTE,
    payload : {
        suggestionId : string,
        isPositive : boolean,
        ip : string
    }
}

export interface IAddingVoteAction
{
    type : SuggestionActionTypes.ADDING_VOTE
}

export interface IAddedVoteAction
{
    type : SuggestionActionTypes.ADDED_VOTE,
    payload : {
        suggestion : ISuggestionItem
    }
}

export interface IAddingVoteFailedAction
{
    type : SuggestionActionTypes.ADDING_VOTE_FAILED
}

export function getAllSuggestions(): IGetAllSuggestionsAction
{
    return {
        type: SuggestionActionTypes.GET_ALL_SUGGESTIONS
    }
}

export function gettingAllSuggestions(): IGettingAllSuggestionsAction
{
    return {
        type: SuggestionActionTypes.GETTING_ALL_SUGGESTIONS
    }
}

export function gotAllSuggestions(suggestions: ISuggestionItem[]): IGotAllSuggestionsAction
{
    return {
        type: SuggestionActionTypes.GOT_ALL_SUGGESTIONS,
        payload: {
            suggestions : suggestions
        }
    }
}

export function gettingAllSuggestionsFailed(): IGettingAllSuggestionsFailedAction
{
    return {
        type: SuggestionActionTypes.GETTING_ALL_SUGGESTIONS_FAILED
    }
}

export function createSuggestion(content : string) : ICreateSuggestionAction
{
    return {
        type : SuggestionActionTypes.CREATE_SUGGESTION,
        payload : {
            content : content
        }
    }
}

export function creatingSuggestion() : ICreatingSuggestionAction
{
    return {
        type : SuggestionActionTypes.CREATING_SUGGESTION
    }
}

export function createdSuggestion(suggestion : ISuggestionItem) : ICreatedSuggestionAction
{
    return {
        type : SuggestionActionTypes.CREATED_SUGGESTION,
        payload : {
            suggestion : suggestion
        }
    }
}

export function creatingSuggestionFailed() : ICreatingSuggestionFailedAction
{
    return {
        type : SuggestionActionTypes.CREATING_SUGGESTION_FAILED
    }
}

export function addVote(suggestionId : string, isPositive : boolean, ip : string) : IAddVoteAction
{
    return {
        type : SuggestionActionTypes.ADD_VOTE,
        payload : {
            suggestionId : suggestionId,
            isPositive : isPositive,
            ip : ip
        }
    }
}

export function addindVote() : IAddingVoteAction
{
    return {
        type : SuggestionActionTypes.ADDING_VOTE
    }
}

export function addedVote(suggestion : ISuggestionItem) : IAddedVoteAction
{
    return {
        type : SuggestionActionTypes.ADDED_VOTE,
        payload : {
            suggestion : suggestion
        }
    }
}

export function addingVoteFailed() : IAddingVoteFailedAction
{
    return {
        type : SuggestionActionTypes.ADDING_VOTE_FAILED
    }
}