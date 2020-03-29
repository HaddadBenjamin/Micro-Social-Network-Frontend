import Item from "../components/Items/Item";

export interface ItemState
{
    items: Item[]
}

const initialState: ItemState =
{
    items: []
};
export const searchItemsReducer = (itemState: ItemState = initialState, action: string) =>
{
    switch (action.type) {
        case "SEARCH_ITEMS":
            return {
                ...initialState.items,
                items: action.payload || []
            };

        default:
            return itemState;
    }
};

