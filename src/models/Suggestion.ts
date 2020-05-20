import IDictionary from "../shared/models/IDictionary";
import IHalLinksResponse, {IHalLink} from "../shared/models/IHalLinks";

export interface ISuggestionItem
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

export default interface ISuggestion extends IHalLinksResponse, ISuggestionItem
{
}

export interface ISuggestionComment extends IHalLinksResponse, ISuggestionCommentItem
{
}

class EmptySuggestion implements ISuggestion
{
    Comments!: [];
    Content!: '';
    CreatedBy!: '';
    Id!: '';
    NegativeVoteCount!: 0;
    PositiveVoteCount!: 0;
    Votes!: [];
    _links!: { }
}

export const emptySuggestion = new EmptySuggestion();