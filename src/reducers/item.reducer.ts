import Item from "../components/Items/Item";

export interface ItemState
{
    items : Item[]
}

const initialState =
{
    items : []
};
export const searchItemsReducer = (state : ItemState = initialState, action : any) => {
    switch (action.type)
    {
        case "SEARCH_ITEMS":
            return {
                items : [...initialState.items, action.payload ]
            };

        default:
            return state;
    }
};

