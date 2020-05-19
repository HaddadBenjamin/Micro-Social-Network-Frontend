import HalLinks from "../shared/utilities/HalLinks";

export interface ISuggestionItem extends HalLinks
{
    Id : string,
    CreatedBy : string,
    Content : string,
    PositiveVoteCount : 0,
    NegativeVoteCount : 0,
    Votes : ISuggestionVoteItem[],
    Comments : ISuggestionCommentItem[]
}

export interface ISuggestionVoteItem extends HalLinks
{
    CreatedBy : string,
    IsPositive : boolean
}

export interface ISuggestionCommentItem extends HalLinks
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

export default ISuggestionItem;