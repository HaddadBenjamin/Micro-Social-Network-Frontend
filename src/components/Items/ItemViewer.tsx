import React, {useState, useEffect} from 'react';
import {orderBy, some, map, filter} from 'lodash'
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

    function onImageError(event: any): void
    {
        const notFoundImageUrl = `${window.location.origin.toString()}/http_code_404_error.jpg`;

        event.target.src = notFoundImageUrl;
    }

    function onSearch(searchedElements: Item[], searchedTerm: string): void
    {
        setFilteredItems(searchedElements);
        setSearchTerm(searchedTerm);
    }

    function shouldFilterItemByName(item : Item, term : string) : boolean
    {
        return item.Name.toLowerCase().includes(term);
    }

    function shouldFilterItemByType(item : Item, term : string) : boolean
    {
        return item.Type.toLowerCase().replace("_", " ").includes(term);
    }

    function shouldFilterItemByProperties(item : Item, term : string) : boolean
    {
        return some(item.Properties, (property) => property.FormattedName.toLowerCase().includes(term));
    }

    function searchFilter(searchElement: Item, searchTerm: string): boolean
    {
        const term = searchTerm.toLowerCase();

        return  shouldFilterItemByName(searchElement, term) ||
            shouldFilterItemByType(searchElement, term) ||
            shouldFilterItemByProperties(searchElement, term);
    }

    function getPropertyValue(property: ItemProperty) : string
    {
        const minimumPropertyValue = Math.round(Math.min(property.Minimum, property.Maximum));
        const maximumPropertyValue = Math.round(Math.max(property.Minimum, property.Maximum));
        const propertyValue : string =
            property.Par > 0 ? property.Par.toString() :
            minimumPropertyValue === maximumPropertyValue ? minimumPropertyValue.toString() :
            minimumPropertyValue < 0 && maximumPropertyValue < 0 ? `${maximumPropertyValue} To ${minimumPropertyValue}` :
            maximumPropertyValue < 0 ? `${minimumPropertyValue} To ${maximumPropertyValue}` :
                `${minimumPropertyValue}-${maximumPropertyValue}`;

        return Number(propertyValue) === 0 ? '' : propertyValue;
    }

    function getPropertyDisplayed(property : ItemProperty, propertyValue : string) : string
    {
        if ((!isNaN(parseInt(propertyValue)) && parseInt(propertyValue) < 0) || property.FirstCharacter == null)
            property.FirstCharacter = '';

        let isPercent = (property.IsPercent && propertyValue !== '' ? '%' : '');
        let valueDisplayed = `${propertyValue}${isPercent} `;

        if (valueDisplayed === ' ')
            valueDisplayed = '';

        return  property.FirstCharacter +
                valueDisplayed.replace('--', ' To -') +
                property.FormattedName.replace('--', ' To -');
    }

    function getDisplayedAttributes(item : Item)
    {
        return map(item.Properties, (property: ItemProperty) =>
        {
            const propertyValue = getPropertyValue(property);
            const propertyDisplayed = getPropertyDisplayed(property, propertyValue);

            return <div key={property.Id} className="diablo-attribute">
                <Highlight  text={propertyDisplayed} searchTerm={searchTerm} textColor="#6f5df7"/>
                <br/>
            </div>
        });
    }

    function calculMinimumDamage(lowestMinimumDamage: number, biggestMinimumDamage: number, lowestMaximumDamage : number): string
    {
        return Math.min(lowestMinimumDamage, lowestMaximumDamage) === Math.max(lowestMinimumDamage, lowestMaximumDamage) ?
            Math.min(lowestMinimumDamage, lowestMaximumDamage).toString() :
            `${Math.min(lowestMinimumDamage, lowestMaximumDamage)}-${Math.max(lowestMinimumDamage, lowestMaximumDamage)}`;
    }
    function calculLowestMaximumDamage(lowestMinimumDamage: number, biggestMinimumDamage: number, lowestMaximumDamage: number, biggestMaximumDamage: number): string
    {
        return Math.min(lowestMinimumDamage, lowestMaximumDamage) === Math.min(biggestMaximumDamage, lowestMaximumDamage) ?
            Math.min(biggestMaximumDamage, lowestMaximumDamage).toString():
            `${Math.min(lowestMinimumDamage, lowestMaximumDamage)}-${Math.min(biggestMaximumDamage, lowestMaximumDamage)}`;
    }

    function calculBiggestMaximumDamage(lowestMinimumDamage: number, biggestMinimumDamage: number, lowestMaximumDamage: number, biggestMaximumDamage: number): string
    {
        return Math.min(biggestMaximumDamage, biggestMinimumDamage) === Math.max(biggestMaximumDamage, biggestMinimumDamage) ?
            Math.max(biggestMaximumDamage, biggestMinimumDamage).toString() :
            `${Math.min(biggestMaximumDamage, biggestMinimumDamage)}-${Math.max(biggestMaximumDamage, biggestMinimumDamage)}`;
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

    function getDefence(item : Item) : string
    {
        return item.MaximumDefenseMinimum === item.MaximumDefenseMaximum ?
            item.MaximumDefenseMinimum.toString() :
            `${Math.min(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}-${Math.max(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}`
    }

    function getOneHandDamage(item : Item) : string
    {
        return calculDamage(
            item.MinimumOneHandedDamageMinimum,
            item.MinimumOneHandedDamageMaximum,
            item.MaximumOneHandedDamageMinimum,
            item.MaximumOneHandedDamageMaximum);
    }

    function getTwoHandDamage(item : Item) : string
    {
        return calculDamage(
            item.MinimumTwoHandedDamageMinimum,
            item.MinimumTwoHandedDamageMaximum,
            item.MaximumTwoHandedDamageMinimum,
            item.MaximumTwoHandedDamageMaximum);
    }

    function getDisplayedItem(item : Item)
    {
        const attributes = getDisplayedAttributes(item);
        const defense = getDefence(item);
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

    function getItemImageStyle(item : Item) : CSS.Properties
    {
        let width : string = '';

        if (item.ImageName === "amu1") {
            item.ImageName = 'amu' + maths.random(1, 3).toString();
            width = '40px';
        }
        if (item.ImageName === "ring1") {
            item.ImageName = 'ring' + maths.random(1, 5).toString();
            width = '40px';
        }

        return {
                width: width,
            };
    }

    function getItemImageUrl(imageName : string) : string
    {
        return `${window.location.origin.toString()}/${imageName}.gif`;
    }
    
    function getItemNameDisplayed(item : Item)
    {
        const itemImageSyle = getItemImageStyle(item);
        const itemImageUrl = getItemImageUrl(item.ImageName);

        return <>
            <Highlight text={item.Name} searchTerm={searchTerm}/>
            <img className="item-image border info rounded mb-0"
                 src={itemImageUrl}
                 style={itemImageSyle} onError={onImageError}
                 alt="testImage.."/>
        </>;
    }

    const data: any =
        {
            columns:
                [
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
                ]
        };

    let rows =
        //orderBy(filteredItems, ['Name'])
        map(filteredItems, function (item: Item)
            {
                const displayedItem = getDisplayedItem(item);
                const displayedItemName = getItemNameDisplayed(item);

                return {
                    Name: displayedItemName,
                    Item: displayedItem,
                    LevelRequired: item.LevelRequired,
                }
            }
        );

        data.rows = orderBy
        (rows.map(function (item)
        {
            return {
                'Name': item.Name,
                'Stats': item.Item,
                'LevelRequired': item.LevelRequired,
            };
        }), ['LevelRequired']);

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
                                        data={data}
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
