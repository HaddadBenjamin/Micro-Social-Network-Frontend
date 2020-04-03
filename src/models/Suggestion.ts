interface ISuggestionItem
{
    Id : string,
    Content : string,
    PositiveVoteCount : 0,
    NegativeVoteCount : 0,
    Votes : ISuggestionVoteItem[]
}

export interface ISuggestionVoteItem
{
    Ip : string,
    IsPositive : boolean
}

export interface ISuggestionVoteRequest
{
    SuggestionId : string,
    IsPositive : boolean,
    Ip : string
}

export default ISuggestionItem;