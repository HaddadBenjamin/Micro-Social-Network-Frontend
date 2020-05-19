import ISuggestionItem from "../../models/Suggestion";

const EmptySuggestion : ISuggestionItem =
{
    Content : '',
    Comments : [],
    Votes : [],
    NegativeVoteCount : 0,
    PositiveVoteCount : 0,
    Id : '',
    CreatedBy :'',
    _links : {}
};

export default EmptySuggestion;