import IHalLinks from "../shared/models/HalLinks";

interface ISuggestionItem extends IHalLinks
{
    Id : string,
    CreatedBy : string,
    Content : string,
    PositiveVoteCount : 0,
    NegativeVoteCount : 0,
    Votes : ISuggestionVoteItem[],
    Comments : ISuggestionCommentItem[]
}

export interface ISuggestionVoteItem extends IHalLinks
{
    CreatedBy : string,
    IsPositive : boolean
}

export interface ISuggestionCommentItem extends IHalLinks
{
    Id : string,
    CreatedBy : string;
    Comment : string
}

export interface ISuggestionVoteRequest
{
    SuggestionId : string,
    IsPositive : boolean,
}

export const emptySuggestion : ISuggestionItem =
{
    Content : '',
    Comments : [],
    Votes : [],
    NegativeVoteCount : 0,
    PositiveVoteCount : 0,
    Id : '',
    CreatedBy :'',
    _links : {}
}

export default ISuggestionItem;