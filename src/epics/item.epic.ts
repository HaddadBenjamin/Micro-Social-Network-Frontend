import {searchItems} from "../actions/item.action";
import {
    filter,
    map,
    catchError
} from 'rxjs/operators';
import {
    combineEpics,
    Epic
} from "redux-observable";
import api from "../shared/utilities/api";
import IItem from "../models/Items";
import {AxiosResponse} from 'axios';
import { from, of } from "rxjs";

export const searchItemsEpic: Epic = (action$, state$) => action$.pipe(
    filter(searchItems.started.match),
    map(action =>
    {
        from(api.get('items/search', {
            SubCategories: action.payload.subCategories
        })).pipe(
            map((response: AxiosResponse<IItem[]>) => searchItems.done({
                params: action.payload,
                result: {items: response.data}
            })),
            catchError(() => of(searchItems.failed)))
    })
);
export default combineEpics(searchItemsEpic);
