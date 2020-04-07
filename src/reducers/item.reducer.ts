import {
    ItemActionTypes,
    ItemsAction
} from "../actions/item.action";
import IItem from "../models/Items";
import ApiStatus from "../models/ApiStatus";
import produce from "immer";

export interface IItemState
{
    searchingItemsStatus : ApiStatus,
    items: IItem[]
}

export const initialItemsState: IItemState =
{
    searchingItemsStatus : ApiStatus.LOADED,
    items: []
};

export default function itemsReducer(state : IItemState = initialItemsState, action : ItemsAction)
{
    return produce(state, draft =>{
        switch (action.type) {
            case ItemActionTypes.SEARCH_ITEMS:
            case ItemActionTypes.SEARCHING_ITEMS:
                draft.searchingItemsStatus = ApiStatus.LOADING;
                break;

            case ItemActionTypes.SEARCHED_ITEMS:
                draft.items = action.payload.items;
                draft.searchingItemsStatus = ApiStatus.LOADED;
                break;

            case ItemActionTypes.SEARCHING_ITEMS_FAILED :
                draft.searchingItemsStatus = ApiStatus.FAILED;
                break;
        }
    })
}
