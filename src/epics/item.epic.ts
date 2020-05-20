import {
    catchError,
    filter,
    map,
    startWith,
    switchMap
} from "rxjs/operators";
import {isOfType} from "typesafe-actions";
import {
    from,
    of
} from "rxjs";
import {AxiosResponse} from "axios";
import apiHelpers from "../shared/helpers/apiHelpers";
import {
    combineEpics,
    Epic
} from "redux-observable";
import {IGlobalState} from "../reducers";
import {
    ItemActionTypes,
    ItemsAction,
    searchedItems,
    searchingItems,
    searchingItemsFailed
} from "../actions/item.action";
import IItem from "../models/Items";

type ItemEpic = Epic<ItemsAction, ItemsAction, IGlobalState>;

const searchItemsEpic: ItemEpic = (action$, state$) => action$.pipe(
    filter(isOfType(ItemActionTypes.SEARCH_ITEMS)),
    switchMap(action =>
        from(apiHelpers.get('items/search', {
            SubCategories: action.payload.subCategories
        })).pipe(
            map((response: AxiosResponse<IItem[]>) => searchedItems(response.data)),
            startWith(searchingItems()),
            catchError(() => of(searchingItemsFailed()))
        ))
);
export default combineEpics(searchItemsEpic);
