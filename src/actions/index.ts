import {SuggestionsAction} from "./suggestion.action";
import {
    UsersAction
} from "./user.action";
import {ItemsAction} from "./item.action";

export type ApplicationAction =
    SuggestionsAction |
    UsersAction |
    ItemsAction;