import React, {useState, useEffect} from 'react';
import {orderBy, some, map, forEach, filter} from 'lodash'
import './ItemViewer.css';
import {
    MDBDataTable,
    MDBContainer,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol
} from 'mdbreact';
import maths from '../../shared/utilities/maths'
import Search from '../../shared/components/Search'
import Highlight from "../../shared/components/Highlight";
import {useSelector} from "react-redux";
import {GlobalState} from "../../store/store";
import Item, {ItemProperty} from "./Item";
import CSS from 'csstype';

// Ce compossant fait tellement trop de choses, je gagnerais à le découper.
const ItemViewer = () =>
{
    const itemFromGlobalState = useSelector<GlobalState, Item[]>(globalState => globalState.searchItems.items);

    const [items, setItems] = useState(itemFromGlobalState);
    const [filteredItems, setFilteredItems] = useState(itemFromGlobalState);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() =>
    {
        setItems(itemFromGlobalState);
        setFilteredItems(itemFromGlobalState);
    }, [itemFromGlobalState]);

    //region search logics, it's should be extrated in another component or 2 for the filters.
    function onSearch(searchedElements: Item[], searchedTerm: string): void
    {
        setFilteredItems(searchedElements);
        setSearchTerm(searchedTerm);
    }

    function shouldFilterItemByName(item: Item, term: string): boolean
    {
        return item.Name.toLowerCase().includes(term);
    }

    function shouldFilterItemByType(item: Item, term: string): boolean
    {
        return item.Type.toLowerCase().replace("_", " ").includes(term);
    }

    function shouldFilterItemByProperties(item: Item, term: string): boolean
    {
        return some(item.Properties, (property) => property.FormattedName.toLowerCase().includes(term));
    }

    function searchFilter(searchElement: Item, searchTerm: string): boolean
    {
        const term = searchTerm.toLowerCase();

        return shouldFilterItemByName(searchElement, term) ||
            shouldFilterItemByType(searchElement, term) ||
            shouldFilterItemByProperties(searchElement, term);
    }

    //endregion

    //region item calculation, most of this complex logic could and should be handled by the backend side during the conversion of the database model to the dto response. Because it's not the role to the frontend to do that.
    //region property value
    function calculPropertyValue(property: ItemProperty): string
    {
        const minimumPropertyValue = Math.round(Math.min(property.Minimum, property.Maximum));
        const maximumPropertyValue = Math.round(Math.max(property.Minimum, property.Maximum));
        const propertyValue: string =
            property.Par > 0 ? property.Par.toString() :
                minimumPropertyValue === maximumPropertyValue ? minimumPropertyValue.toString() :
                    minimumPropertyValue < 0 && maximumPropertyValue < 0 ? `${maximumPropertyValue} To ${minimumPropertyValue}` :
                        maximumPropertyValue < 0 ? `${minimumPropertyValue} To ${maximumPropertyValue}` :
                            `${minimumPropertyValue}-${maximumPropertyValue}`;

        return Number(propertyValue) === 0 ? '' : propertyValue;
    }

    function calculPropertyDisplayed(property: ItemProperty): string
    {
        const propertyValue = calculPropertyValue(property);
        const propertyValueDisplayed = calculPropertyValueDisplayed(property, propertyValue);
        const propertyFirstCharacter = calculPropertyFirstCharacterDisplayed(property, propertyValue);
        const propertyFormattedName = calculPropertyFormattedNameDisplayed(property);

        return `${propertyFirstCharacter}${propertyValueDisplayed}${propertyFormattedName}`;
    }

    function calculPropertyValueDisplayed(property: ItemProperty, propertyValue: string): string
    {
        const isPercent = (property.IsPercent && propertyValue !== '' ? '%' : '');
        let valueDisplayed = `${propertyValue}${isPercent} `;

        if (valueDisplayed === ' ')
            valueDisplayed = '';

        return valueDisplayed.replace('--', ' To -');
    }

    function calculPropertyFirstCharacterDisplayed(property: ItemProperty, propertyValue: string): string
    {
        return ((!isNaN(parseInt(propertyValue)) && parseInt(propertyValue) < 0) || property.FirstCharacter == null) ?
            '' :
            property.FirstCharacter;
    }

    function calculPropertyFormattedNameDisplayed(property: ItemProperty): string
    {
        return property.FormattedName.replace('--', ' To -');
    }

    //endregion

    //region damage calculation
    function getOneHandDamage(item: Item): string
    {
        return calculDamage(
            item.MinimumOneHandedDamageMinimum,
            item.MinimumOneHandedDamageMaximum,
            item.MaximumOneHandedDamageMinimum,
            item.MaximumOneHandedDamageMaximum);
    }

    function getTwoHandDamage(item: Item): string
    {
        return calculDamage(
            item.MinimumTwoHandedDamageMinimum,
            item.MinimumTwoHandedDamageMaximum,
            item.MaximumTwoHandedDamageMinimum,
            item.MaximumTwoHandedDamageMaximum);
    }

    function calculDamage(lowestMinimumDamage: number, biggestMinimumDamage: number, lowestMaximumDamage: number, biggestMaximumDamage: number): string
    {
        const calculedMinimumDamage = calculMinimumDamage(lowestMinimumDamage, biggestMinimumDamage, lowestMaximumDamage);
        const calculedLowestMinimumDamage = calculLowestMaximumDamage(lowestMinimumDamage, biggestMinimumDamage, lowestMaximumDamage, biggestMaximumDamage);
        const calculedBiggestMaximumDamage = calculBiggestMaximumDamage(lowestMinimumDamage, biggestMinimumDamage, lowestMaximumDamage, biggestMaximumDamage);

        return lowestMinimumDamage === biggestMinimumDamage && lowestMaximumDamage === biggestMaximumDamage ?
            `${calculedMinimumDamage}` :
            `${calculedLowestMinimumDamage} to ${calculedBiggestMaximumDamage}`;
    }

    function calculMinimumDamage(lowestMinimumDamage: number, biggestMinimumDamage: number, lowestMaximumDamage: number): string
    {
        return Math.min(lowestMinimumDamage, lowestMaximumDamage) === Math.max(lowestMinimumDamage, lowestMaximumDamage) ?
            Math.min(lowestMinimumDamage, lowestMaximumDamage).toString() :
            `${Math.min(lowestMinimumDamage, lowestMaximumDamage)}-${Math.max(lowestMinimumDamage, lowestMaximumDamage)}`;
    }

    function calculLowestMaximumDamage(lowestMinimumDamage: number, biggestMinimumDamage: number, lowestMaximumDamage: number, biggestMaximumDamage: number): string
    {
        return Math.min(lowestMinimumDamage, lowestMaximumDamage) === Math.min(biggestMaximumDamage, lowestMaximumDamage) ?
            Math.min(biggestMaximumDamage, lowestMaximumDamage).toString() :
            `${Math.min(lowestMinimumDamage, lowestMaximumDamage)}-${Math.min(biggestMaximumDamage, lowestMaximumDamage)}`;
    }

    function calculBiggestMaximumDamage(lowestMinimumDamage: number, biggestMinimumDamage: number, lowestMaximumDamage: number, biggestMaximumDamage: number): string
    {
        return Math.min(biggestMaximumDamage, biggestMinimumDamage) === Math.max(biggestMaximumDamage, biggestMinimumDamage) ?
            Math.max(biggestMaximumDamage, biggestMinimumDamage).toString() :
            `${Math.min(biggestMaximumDamage, biggestMinimumDamage)}-${Math.max(biggestMaximumDamage, biggestMinimumDamage)}`;
    }

    //endregion

    //region calcul item image
    function calculItemImageStyle(item: Item): CSS.Properties
    {
        const newWidth : number = 40;
        const defaultMaxWidth = '100%';
        let width : number = updateTheItemImageSize(item, newWidth);

        width = randomizeTheItemImageNameAndUpdateTheImageSize(item, width, newWidth);
        width = updateTheSizeOfImageThatNeedToBeResizedForUniquesImage(item, width, newWidth);

        const maxWidth = width != 0 ? `${0.75 * width}%` : defaultMaxWidth.toString();

        return {
            width: width != 0 ? `${width}px` : '',
            maxWidth : maxWidth
        };
    }


    function updateTheItemImageSize(item : Item, newWidth : number) : number
    {
        const imagesThatNeedToBeResized = [
            "katar",
            "hatchethands",
            "scissorskatar",
            "claws",
            "maidenjavelin",
            "dragonstone",
            "sacredglobe",
            "smokedsphere",
            "claspedorb",
            "eagleorb",
            "arrows",
            "bolts",
            "bluecharm",
            "hellfiretorch",
            "titans",
            "tstroke",
            "bartucs",
            "shadowkiller",
            "fireliz",
            "jadetalon",
            "coldkill",
            "anni",
            "gheeds",
            "crownofages",
            "cot",
            "shako",
            "nightwingsveil",
            "veilofsteel",
            "demonsarch",
            "gargoylesbite",
            "shortspear",
            "wraithflight",
            "ghostflame",
            "Stormspike",
            "fleshripper",
            "blessedcircle",
            "skewer",
            "bladeofalibaba",
            "atlantian",
            "headstriker",
            "warshrike",
            "gimmershred",
            "durielsshell",
            "ironpelt",
            "arkaines",
            "flamebellow",
            "todesfaelleflamme",
            "stoneraven",
            "minotaur",
            "stormrider",
            "kukoshakaku",
            "riphook",
            "warpspear",
            "skullcollector",
            "mangsongslesson",
            "blackhand",
            "deathsweb",
        ];

        if (imagesThatNeedToBeResized.includes(item.ImageName))
            return newWidth;

        return 0;
    }

    function randomizeTheItemImageNameAndUpdateTheImageSize(item : Item, width : number, newWidth : number) : number
    {
        var imageDatasWhereTheImageNameMustBeRandomized = [
            { imageName : "amu1", newImageName : "amu", firstImageIndex : 1, lastImageIndex : 3 },
            { imageName : "ring1", newImageName : "ring", firstImageIndex : 1, lastImageIndex : 5 },
            { imageName : "jewel", newImageName : "jewel0", firstImageIndex : 1, lastImageIndex : 6 },
            { imageName : "largecharm", newImageName : "largecharm0", firstImageIndex : 1, lastImageIndex : 3 }
        ];

        forEach(imageDatasWhereTheImageNameMustBeRandomized, function(imageData)
        {
            if (item.ImageName == imageData.imageName)
            {
                item.ImageName = imageData.newImageName + maths.random(imageData.firstImageIndex, imageData.lastImageIndex).toString();
                width = newWidth;
            }
        });

        return width;
    }

    function updateTheSizeOfImageThatNeedToBeResizedForUniquesImage(item : Item, width : number, newWidth : number) : number
    {
        const imageThatNeedToBeResizedData = [
            { Name : "gargoylesbite", Size : 40 },
            { Name : "shortspear", Size : 75 },
            { Name : "butcherspupil", Size : 55 },
            { Name : "flayedoneskin", Size : 60 },
            { Name : "vampiregaze", Size : 55 },
            { Name : "ironpelt", Size : 55 },
            { Name : "rockstopper", Size : 50 },
            { Name : "steelshade", Size : 55 },
            { Name : "darksighthelm", Size : 55 },
            { Name : "durielsshell", Size : 55 },
            { Name : "arkaines", Size : 55 },
            { Name : "cot", Size : 48 },
            { Name : "nightwingsveil", Size : 56 },
            { Name : "veilofsteel", Size :52},
            { Name : "crownofages", Size : 55},
            { Name : "shako", Size : 48},
            { Name : "tstroke", Size : 45 },
            { Name : "shadowkiller", Size : 45 },
            { Name : "blackhand", Size : 32 },
            { Name : "coldkill", Size : 40 },
            { Name : "stormrider", Size : 60 },
            { Name : "minotaur", Size : 60 },
            { Name : "kukoshakaku", Size : 60 },
            { Name : "stormspike", Size : 36 },
            { Name : "ghostflame", Size : 52 },
            { Name : "fleshripper", Size : 52 },
            { Name : "demonsarch", Size : 28 },
            { Name : "wraithflight", Size : 40 },
            { Name : "warpspear", Size : 36},
            { Name : "skullcollector", Size : 60 },
            { Name : "mangsongslesson", Size : 54 },
            { Name : "atlantian", Size : 36 },
            { Name : "ginthersrift", Size : 55 },
            { Name : "headstriker", Size : 60 },
            { Name : "todesfaelleflamme", Size : 55 },
            { Name : "flamebellow", Size : 46 },
            { Name : "bladeofalibaba", Size : 30 },
            { Name : "plaguebearer", Size : 70 },
            ]
        const imageThatNeedToBeResized = filter(imageThatNeedToBeResizedData, (imageData : any) => imageData.Name == item.ImageName);

        if (imageThatNeedToBeResized.length != 0)
        {
            width = imageThatNeedToBeResized[0].Size;
            console.log(width);

        }

        return width;
    }


    function calculItemImageUrl(imageName: string): string
    {
        return `${window.location.origin.toString()}/${imageName}.gif`;
    }

    //endregion

    function calculDefence(item: Item): string
    {
        return item.MaximumDefenseMinimum === item.MaximumDefenseMaximum ?
            item.MaximumDefenseMinimum.toString() :
            `${Math.min(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}-${Math.max(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}`
    }

    //endregion

    //region display part, those logics should be extract in dedicated functional components.
    function getDisplayedItem(item: Item)
    {
        const attributes = getDisplayedAttributes(item);
        const defense = calculDefence(item);
        const oneHandDamage = getOneHandDamage(item);
        const twoHandDamage = getTwoHandDamage(item);

        return <>
            <div className="item" key={item.Id}>
                <div className="unique">
                    <Highlight text={item.Name} searchTerm={searchTerm} textColor="#c7b790ed"/><br/>
                    <Highlight text={item.Type} searchTerm={searchTerm} textColor="#c7b790ed"/>
                </div>
                <div>
                    {item.MaximumDefenseMinimum > 0 ?
                        <div>Defense : <span className="diablo-attribute">{defense}</span></div> : ''}
                    {item.MinimumOneHandedDamageMinimum > 0 ?
                        <div>One-Hand Damage : <span className="diablo-attribute">{oneHandDamage}</span>
                        </div> : ''}
                    {item.MinimumTwoHandedDamageMinimum > 0 ?
                        <div>Two-Hand Damage : <span className="diablo-attribute">{twoHandDamage}</span>
                        </div> : ''}
                </div>
                <div className="required-attribute">
                    {item.StrengthRequired > 0 ? <div>Required Strength : {item.StrengthRequired} </div> : ''}
                    {item.DexterityRequired > 0 ?
                        <div>Required Dexterity : {item.DexterityRequired} </div> : ''}
                    {item.LevelRequired > 0 ? <div>Required Level : {item.LevelRequired} </div> : ''}
                </div>
                <div>
                    {attributes}
                </div>

            </div>
        </>;
    }

    function getDisplayedAttributes(item: Item)
    {
        return map(item.Properties, (property: ItemProperty) =>
        {
            const propertyDisplayed = calculPropertyDisplayed(property);

            return <div key={property.Id} className="diablo-attribute">
                <Highlight text={propertyDisplayed} searchTerm={searchTerm} textColor="#6f5df7"/>
                <br/>
            </div>
        });
    }

    function getItemNameDisplayed(item: Item)
    {
        const itemImageSyle = calculItemImageStyle(item);
        const itemImageUrl = calculItemImageUrl(item.ImageName);

        return <>
            <Highlight text={item.Name} searchTerm={searchTerm}/>
            <img className="item-image border info rounded mb-0"
                 src={itemImageUrl}
                 style={itemImageSyle} onError={onImageError}
                 alt="testImage.."/>
        </>;
    }

    //endregion

    //region item data table logs related
    function getItemDataTable(items: Item[]): any
    {
        return {
            columns: getItemDataTableColumns(),
            rows: getItemDataTableRows(orderedFilteredItems)
        };
    }

    function getItemDataTableColumns(): any
    {
        return [
            {
                label: 'Name',
                field: 'Name',
                sort: 'disabled',
                width: 100
            },
            {
                label: 'Stats',
                field: 'Stats',
                sort: 'disabled'
            },
            {
                label: 'Level Required',
                field: 'LevelRequired',
                sort: 'asc',
                width: 10
            }
        ];
    }

    function getItemDataTableRows(orderedFilteredItem: Item[]): any
    {
        return map(orderedFilteredItems, function (item: Item)
            {
                const displayedItem = getDisplayedItem(item);
                const displayedItemName = getItemNameDisplayed(item);

                return {
                    'Name': displayedItemName,
                    'Stats': displayedItem,
                    'LevelRequired': item.LevelRequired,
                }
            }
        );
    }

    //endregion

    function onImageError(event: any): void
    {
        const notFoundImageUrl = `${window.location.origin.toString()}/http_code_404_error.jpg`;

        event.target.src = notFoundImageUrl;
    }

    const orderedFilteredItems = orderBy(filteredItems, ['LevelRequired', 'Name']);
    const itemDataTable = getItemDataTable(orderedFilteredItems);

    // This part should be a functional component and depends only of searchFilter, items, onSearch and itemDataTable
    return (
        <>
            <div id="item-filter-view">
                <MDBView>
                    <MDBMask className="d-flex justify-content-center align-items-center gradient">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <Search
                                        searchFilter={searchFilter}
                                        elements={items}
                                        onSearch={onSearch}/>
                                    <MDBDataTable
                                        className="item"
                                        data={itemDataTable}
                                        entries={3}/>
                                    <MDBCol/>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
        </>
    );
}

export default ItemViewer;
