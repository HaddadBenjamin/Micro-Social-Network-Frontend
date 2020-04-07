import {SuggestionsAction} from "./suggestion.action";
import {
    UsersAction
} from "./user.action";
import {Action} from "redux";

export type ApplicationAction =
    SuggestionsAction |
    UsersAction |
    Action;