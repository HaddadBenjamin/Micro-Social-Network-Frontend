import Item from "../components/Items/Item";

export interface ItemState
{
    items : Item[]
}

const initialState =
{
    items : []
};
export const searchItemsReducer = (state : ItemState = initialState, action : any) =>
{
    console.log(...initialState.items || [])
    console.log(action.payload)
    switch (action.type)
    {
        case "SEARCH_ITEMS":
            return {
                ...initialState.items || [],
                items : action.payload || []
            };

        default:
            return state;
    }
};

