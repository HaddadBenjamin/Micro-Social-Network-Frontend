import IItem from "../models/Items";
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();
export const searchItems =  actionCreator.async<{subCategories : string}, {items : IItem[]}, {}>('SEARCH_ITEMS');
