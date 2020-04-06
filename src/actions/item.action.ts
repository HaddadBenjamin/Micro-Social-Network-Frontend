import IItem from "../models/Items";

export enum ItemActionTypes
{
    SEARCH_ITEMS = 'items/search',
    SEARCHING_ITEMS = 'items/searching',
    SEARCHED_ITEMS = 'items/searched',
    SEARCHING_ITEMS_FAILED = 'items/searching_failed'
}

export interface ISearchItemsAction
{
    type: ItemActionTypes.SEARCH_ITEMS,
    payload : {
        subCategories : string
    }
}

export interface ISearchingItemsAction
{
    type : ItemActionTypes.SEARCHING_ITEMS
}

export interface ISearchedItemsAction
{
    type : ItemActionTypes.SEARCHED_ITEMS,
    payload : {
        items : IItem[]
    }
}

export interface ISearchingItemsFailedAction
{
    type : ItemActionTypes.SEARCHING_ITEMS_FAILED
}


export function searchItems(subCategories : string): ISearchItemsAction
{
    return {
        type: ItemActionTypes.SEARCH_ITEMS,
        payload : {
            subCategories : subCategories
        }
    }
}

export function searchingItems() : ISearchingItemsAction
{
    return {
        type : ItemActionTypes.SEARCHING_ITEMS
    }
}

export function searchedItems(items : IItem[]) : ISearchedItemsAction
{
    return {
        type : ItemActionTypes.SEARCHED_ITEMS,
        payload : {
            items : items
        }
    }
}

export function searchingItemsFailed() : ISearchingItemsFailedAction
{
    return {
        type: ItemActionTypes.SEARCHING_ITEMS_FAILED
    }
}

export type ItemsAction =
    ISearchItemsAction |
    ISearchingItemsAction |
    ISearchedItemsAction |
    ISearchingItemsFailedAction;
