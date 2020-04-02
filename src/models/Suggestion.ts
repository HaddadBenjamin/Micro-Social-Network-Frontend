interface ISuggestionItem
{
    Id : string,
    Content : string,
    PositiveVoteCount : 0,
    NegativeVoteCount : 0,
}

export interface ISuggestionVoteRequest
{
    SuggestionId : string,
    IsPositive : boolean,
    Ip : string
}

export default ISuggestionItem;