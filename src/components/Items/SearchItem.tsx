import React from 'react';
import SearchItemDto, {ItemSubCategory} from "./SearchItemDto";
import Item from "./Item";
import ItemCategoriesFilters from './ItemCategoriesFilter'
import {map} from 'lodash'
import qs from 'qs'
import api from '../../shared/utilities/api'
import scrollTo from '../../shared/utilities/animate'
import {useDispatch} from "react-redux";

interface Props {
    search: SearchItemDto,
}

interface State {
}

const SearchItem = (props: Props) => {
    const dispatch = useDispatch();

    // Armors :
    function onClickBodyArmors() {
        return setSubCategoriesAndSearch([ItemSubCategory.Torso]);
    }

    function onClickShields() {
        return setSubCategoriesAndSearch([ItemSubCategory.Offhand]);
    }

    function onClickGloves() {
        return setSubCategoriesAndSearch([ItemSubCategory.Hands]);
    }

    function onClickShoes() {
        return setSubCategoriesAndSearch([ItemSubCategory.Feet]);
    }

    function onClickHelms() {
        return setSubCategoriesAndSearch([ItemSubCategory.Head]);
    }

    function onClickBelts() {
        return setSubCategoriesAndSearch([ItemSubCategory.Waist]);
    }

    // Weapons :
    function onClickBows() {
        return setSubCategoriesAndSearch([ItemSubCategory.Bow, ItemSubCategory.Two_Handed_Bow]);
    }

    function onClickCrossbows() {
        return setSubCategoriesAndSearch([ItemSubCategory.Crossbow, ItemSubCategory.Two_Handed_Crossbow,]);
    }

    function onClickArrows() {
        return setSubCategoriesAndSearch([ItemSubCategory.Arrows, ItemSubCategory.Bolts]);
    }

    function onClickStaffs() {
        return setSubCategoriesAndSearch([ItemSubCategory.Staff, ItemSubCategory.Two_Handed_Staff]);
    }

    function onClickSwords() {
        return setSubCategoriesAndSearch([ItemSubCategory.Sword, ItemSubCategory.Two_And_One_Handed_Sword]);
    }

    function onClickDaggers() {
        return setSubCategoriesAndSearch([ItemSubCategory.Knife]);
    }

    function onClickAxes() {
        return setSubCategoriesAndSearch([ItemSubCategory.Axe, ItemSubCategory.Two_Handed_Axe]);
    }

    function onClickPolearms() {
        return setSubCategoriesAndSearch([ItemSubCategory.Polearm, ItemSubCategory.Two_Handed_Polearm]);
    }

    function onClickSpears() {
        return setSubCategoriesAndSearch([ItemSubCategory.Spear, ItemSubCategory.Two_Handed_Spear]);
    }

    function onClickMasses() {
        return setSubCategoriesAndSearch([ItemSubCategory.Mace, ItemSubCategory.Two_Handed_Hammer, ItemSubCategory.Hammer]);
    }

    function onClickScepters() {
        return setSubCategoriesAndSearch([ItemSubCategory.Scepter]);
    }

    function onClickClubs() {
        return setSubCategoriesAndSearch([ItemSubCategory.Club]);
    }

    function onClickThrowingWeapons() {
        return setSubCategoriesAndSearch([ItemSubCategory.Throwing_Axe, ItemSubCategory.Throwing_Potions, ItemSubCategory.Thorwing_Knife]);
    }

    function onClickJavelins() {
        return setSubCategoriesAndSearch([ItemSubCategory.Javelin]);
    }

    // Jewelry and others :
    function onClickAmulets() {
        return setSubCategoriesAndSearch([ItemSubCategory.Amulet]);
    }

    function onClickRings() {
        return setSubCategoriesAndSearch([ItemSubCategory.Ring]);
    }

    function onClickCharms() {
        return setSubCategoriesAndSearch([ItemSubCategory.Charm]);
    }

    function onClickJewels() {
        return setSubCategoriesAndSearch([ItemSubCategory.Jewel]);
    }

    // Class specific :
    function onClickAmazon() {
        return setSubCategoriesAndSearch([ItemSubCategory.Amazon_Bow, ItemSubCategory.Amazon_Javelin, ItemSubCategory.Amazon_Spear, ItemSubCategory.Two_Handed_Amazon_Bow, ItemSubCategory.Two_Handed_Amazon_Spear]);
    }

    function onClickDruid() {
        return setSubCategoriesAndSearch([ItemSubCategory.Druid_Helm]);
    }

    function onClickBarbarian() {
        return setSubCategoriesAndSearch([ItemSubCategory.Barbarian_Helm]);
    }

    function onClickAssassin() {
        return setSubCategoriesAndSearch([ItemSubCategory.Hand_To_Hand, ItemSubCategory.Hand_To_Hand_Two_Handed, ItemSubCategory.Assassin_Claw]);
    }

    function onClickSorceress() {
        return setSubCategoriesAndSearch([ItemSubCategory.Orb, ItemSubCategory.Sorceress_Orb]);
    }

    function onClickNecromancer() {
        return setSubCategoriesAndSearch([ItemSubCategory.Wand, ItemSubCategory.Necromancer_Shield]);
    }

    function onClickPaladin() {
        return setSubCategoriesAndSearch([ItemSubCategory.Paladin_Shield]);
    }

    function setSubCategoriesAndSearch(subCategories: ItemSubCategory[]) {
        props.search.SubCategories = subCategories;

        search();
    }

    function search() {
        api.get<Item[]>(
            'items/search',
            'SEARCH_ITEMS',
            qs.stringify(
                {
                    SubCategories: map(props.search.SubCategories, _ => ItemSubCategory[_]).join(', '),
                }));

        scrollTo('#item-filter-view');
    }

    return (
        <>
            <ItemCategoriesFilters
                onClickBows={onClickBows}
                onClickCrossbows={onClickCrossbows}
                onClickClubs={onClickClubs}
                onClickArrows={onClickArrows}
                onClickStaffs={onClickStaffs}
                onClickSwords={onClickSwords}
                onClickDaggers={onClickDaggers}
                onClickAxes={onClickAxes}
                onClickPolearms={onClickPolearms}
                onClickSpears={onClickSpears}
                onClickMasses={onClickMasses}
                onClickScepters={onClickScepters}
                onClickThrowingWeapons={onClickThrowingWeapons}
                onClickJavelins={onClickJavelins}

                onClickBodyArmors={onClickBodyArmors}
                onClickShields={onClickShields}
                onClickGloves={onClickGloves}
                onClickShoes={onClickShoes}
                onClickHelms={onClickHelms}
                onClickBelts={onClickBelts}

                onClickAmulets={onClickAmulets}
                onClickRings={onClickRings}
                onClickCharms={onClickCharms}
                onClickJewels={onClickJewels}

                onClickAmazon={onClickAmazon}
                onClickAssassin={onClickAssassin}
                onClickBarbarian={onClickBarbarian}
                onClickDruid={onClickDruid}
                onClickPaladin={onClickPaladin}
                onClickNecromancer={onClickNecromancer}
                onClickSorceress={onClickSorceress}
            />
        </>
    );
}

export default SearchItem;