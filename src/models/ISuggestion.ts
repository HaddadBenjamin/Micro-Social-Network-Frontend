export interface ISuggestion
{
    Id : string,
    CreatedBy : string,
    Content : string,
    PositiveVoteCount : 0,
    NegativeVoteCount : 0,
    Votes : ISuggestionVote[],
    Comments : ISuggestionComment[],
}

export interface ISuggestionVote
{
    CreatedBy : string,
    IsPositive : boolean
}

export interface ISuggestionComment
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
