import Item from "../components/Items/Item";
import SearchItemsAction from "../actions/item.action";

export interface ItemState
{
    items: Item[]
}

export const initialItemsState: ItemState =
{
    items: []
};
export const searchItemsReducer = (itemState: ItemState = initialItemsState, action: SearchItemsAction) =>
{
    switch (action.type) {
        case "SEARCH_ITEMS":
            return {
                ...initialItemsState.items,
                items: action.payload || []
            };

        default:
            return itemState;
    }
};

