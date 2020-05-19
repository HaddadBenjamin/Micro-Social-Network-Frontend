import HalLinks from "../shared/utilities/HalLinks";
import {ISuggestion, ISuggestionCommentItem, ISuggestionVoteItem} from "./ISuggestion";

export class Suggestion extends HalLinks implements ISuggestion
{
    Comments!: ISuggestionCommentItem[];
    Content!: string;
    CreatedBy!: string;
    Id!: string;
    NegativeVoteCount!: 0;
    PositiveVoteCount!: 0;
    Votes!: ISuggestionVoteItem[];
}

export default Suggestion;
