export interface ISuggestion
{
    Id : string,
    CreatedBy : string,
    Content : string,
    PositiveVoteCount : 0,
    NegativeVoteCount : 0,
    Votes : ISuggestionVoteItem[],
    Comments : ISuggestionCommentItem[],
}

export interface ISuggestionVoteItem
{
    CreatedBy : string,
    IsPositive : boolean
}

export interface ISuggestionCommentItem
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
