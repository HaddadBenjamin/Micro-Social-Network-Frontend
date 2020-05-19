import HalLinks from "../shared/utilities/HalLinks";
import {ISuggestion, ISuggestionComment, ISuggestionVote} from "./ISuggestion";

export class Suggestion extends HalLinks implements ISuggestion
{
    Comments!: SuggestionComment[];
    Content!: string;
    CreatedBy!: string;
    Id!: string;
    NegativeVoteCount!: 0;
    PositiveVoteCount!: 0;
    Votes!: SuggestionVote[];
}

export class SuggestionVote extends HalLinks implements ISuggestionVote
{
    CreatedBy!: string;
    IsPositive!: boolean;
}

export class SuggestionComment extends HalLinks implements ISuggestionComment
{
    Comment!: string;
    CreatedBy!: string;
    Id!: string;
}

export default Suggestion;
