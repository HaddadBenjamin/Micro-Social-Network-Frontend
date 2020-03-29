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

    function SetDefaultImageOnError(event: any): void
    {
        let defaultImageUrl = `${window.location.origin.toString()}/http_code_404_error.jpg`;

        event.target.src = defaultImageUrl;
    }

    function onSearch(searchedElements: Item[], searchedTerm: string): void
    {
        setFilteredItems(searchedElements);
        setSearchTerm(searchedTerm);
    }

    function searchFilter(searchElement: Item, searchTerm: string): boolean
    {
        let term = searchTerm.toLowerCase();

        setSearchTerm(term);

        return searchElement.Name.toLowerCase().includes(term) ||
            searchElement.Type.toLowerCase().replace("_", " ").includes(term) ||
            some(searchElement.Properties, (property) => property.FormattedName.toLowerCase().includes(term));
    }

    function getPropertyValue(property: ItemProperty) : string
    {
        let minimum = Math.round(Math.min(property.Minimum, property.Maximum));
        let maximum = Math.round(Math.max(property.Minimum, property.Maximum));
        let value = '';

        if (property.Par > 0)
            value = property.Par.toString();
        else if (minimum === maximum)
            value = minimum.toString();
        else if (minimum < 0 && maximum < 0)
            value = `${maximum} To ${minimum}`;
        else if (maximum < 0)
            value = `${minimum} To ${maximum}`;
        else
            value = `${minimum}-${maximum}`;

        if (Number(value) === 0)
            value = '';

        return value;
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

    function calculDamage(minMin: any, minMax: any, maxMin: any, maxMax: any): string
    {
        const first = Math.min(minMin, maxMin) === Math.max(minMin, maxMin) ? Math.min(minMin, maxMin) : `${Math.min(minMin, maxMin)}-${Math.max(minMin, maxMin)}`;
        let second = Math.min(minMin, maxMin) === Math.min(maxMax, maxMin) ? Math.min(maxMax, maxMin) : `${Math.min(minMin, maxMin)}-${Math.min(maxMax, maxMin)}`;
        let third = Math.min(maxMax, minMax) === Math.max(maxMax, minMax) ? Math.max(maxMax, minMax) : `${Math.min(maxMax, minMax)}-${Math.max(maxMax, minMax)}`;

        return minMin === minMax && maxMin === maxMax ?
            `${first}` :
            `${second} to ${third}`;
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
        return window.location.origin.toString() + '/' + imageName + '.gif';
    }

    function getItemNameDisplayed(item : Item)
    {
        const itemImageSyle = getItemImageStyle(item);
        const itemImageUrl = getItemImageUrl(item.ImageName);

        return <>
            <Highlight text={item.Name} searchTerm={searchTerm}/>
            <img className="item-image border info rounded mb-0"
                 src={itemImageUrl}
                 style={itemImageSyle} onError={SetDefaultImageOnError}
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
