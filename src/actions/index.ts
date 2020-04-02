import {SuggestionsAction} from "./suggestion.action";
import {
    UsersAction
} from "./user.action";
import SearchItemsAction from "./item.action";

export type ApplicationAction =
    SuggestionsAction |
    UsersAction |
    SearchItemsAction