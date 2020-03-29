import React, {useState, useEffect} from 'react';
import {orderBy, some, map} from 'lodash'
import './ItemViewer.css';
//import * as styles from './ItemViewer.css'
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
import jest from 'jest-mock'
import Highlight from "../../shared/components/Highlight";
import {useSelector} from "react-redux";
import {GlobalState} from "../../store/store";
import Item, {ItemProperty} from "./Item";


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

    function calculDamage(minMin: any, minMax: any, maxMin: any, maxMax: any): string
    {
        const first = Math.min(minMin, maxMin) === Math.max(minMin, maxMin) ? Math.min(minMin, maxMin) : `${Math.min(minMin, maxMin)}-${Math.max(minMin, maxMin)}`;
        let second = Math.min(minMin, maxMin) === Math.min(maxMax, maxMin) ? Math.min(maxMax, maxMin) : `${Math.min(minMin, maxMin)}-${Math.min(maxMax, maxMin)}`;
        let third = Math.min(maxMax, minMax) === Math.max(maxMax, minMax) ? Math.max(maxMax, minMax) : `${Math.min(maxMax, minMax)}-${Math.max(maxMax, minMax)}`;

        return minMin === minMax && maxMin === maxMax ?
            `${first}` :
            `${second} to ${third}`;
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
                const attributes = map(item.Properties, (property: ItemProperty) =>
                {
                    let min = Math.round(Math.min(property.Minimum, property.Maximum));
                    let max = Math.round(Math.max(property.Minimum, property.Maximum));
                    let value = '';

                    if (property.Par > 0)
                        value = property.Par.toString();
                    else if (min === max)
                        value = min.toString();
                    else if (min < 0 && max < 0)
                        value = `${max} To ${min}`;
                    else if (max < 0)
                        value = `${min} To ${max}`;
                    else
                        value = `${min}-${max}`;

                    if (Number(value) === 0)
                        value = '';

                    if ((!isNaN(parseInt(value)) && parseInt(value) < 0) || property.FirstCharacter == null)
                        property.FirstCharacter = '';

                    let isPercent = (property.IsPercent && value !== '' ? '%' : '');
                    let valueDisplayed = `${value}${isPercent} `;

                    if (valueDisplayed === ' ')
                        valueDisplayed = '';

                    let propertyDisplay = property.FirstCharacter + valueDisplayed.replace('--', ' To -') + property.FormattedName.replace('--', ' To -');
                    return <div key={property.Id} className="diablo-attribute"><Highlight text={propertyDisplay}
                                                                                          searchTerm={searchTerm}
                                                                                          textColor="#6f5df7"/><br/>
                    </div>
                });

                let defense = item.MaximumDefenseMinimum === item.MaximumDefenseMaximum ? item.MaximumDefenseMinimum : `${Math.min(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}-${Math.max(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}`;

                let oneHandDamage = calculDamage(item.MinimumOneHandedDamageMinimum, item.MinimumOneHandedDamageMaximum, item.MaximumOneHandedDamageMinimum, item.MaximumOneHandedDamageMaximum);
                let twoHandDamage = calculDamage(item.MinimumTwoHandedDamageMinimum, item.MinimumTwoHandedDamageMaximum, item.MaximumTwoHandedDamageMinimum, item.MaximumTwoHandedDamageMaximum);

                let itemFormatted = <>
                    <div className="item" style={undefined} key={item.Id}>
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

                let width = null;

                if (item.ImageName === "amu1") {
                    item.ImageName = 'amu' + maths.random(1, 3).toString();
                    width = '40px';
                }
                if (item.ImageName === "ring1") {
                    item.ImageName = 'ring' + maths.random(1, 5).toString();
                    width = '40px';
                }
                const imageStyle = {
                    width: width,
                };

                let imageUrl = window.location.origin.toString() + '/' + item.ImageName + '.gif';

                let itemName = <>
                    <Highlight text={item.Name} searchTerm={searchTerm}/>
                    <img className="item-image border info rounded mb-0" src={imageUrl}
                         style={undefined} onError={SetDefaultImageOnError}
                         alt="testImage.."/>
                </>;

                return {
                    Name: itemName,
                    Item: itemFormatted,
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

    const mock = jest.fn(() => []);

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
                                        style={undefined}
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
