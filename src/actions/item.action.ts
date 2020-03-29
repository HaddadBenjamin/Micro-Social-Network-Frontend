import Item from "../components/Items/Item";

interface SearchItemsAction
{
    type : string,
    payload : Item[]
}

export default SearchItemsAction;