import IItem from "../models/Items";
import ApiStatus from "../models/ApiStatus";
import produce from "immer";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {searchItems} from "../actions/item.action";

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


export default function itemsReducer(state : IItemState = initialItemsState, action : Action)
{
    return produce(state, draft =>
    {
        if (isType(action, searchItems.started))
            draft.searchingItemsStatus = ApiStatus.LOADING;

        if (isType(action, searchItems.done))
        {
            draft.items = action.payload.result.items;
            draft.searchingItemsStatus = ApiStatus.LOADED;
        }

        if (isType(action, searchItems.failed))
            draft.searchingItemsStatus = ApiStatus.FAILED;
    })
}
