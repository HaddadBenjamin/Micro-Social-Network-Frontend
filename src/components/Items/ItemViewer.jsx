import React from "react";
import {ReactDOM} from 'react-dom'
import { orderBy, some } from 'lodash'
import styles  from './ItemViewer.css'
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

class ItemViewer extends React.PureComponent {
    constructor(props) {
        super(props);

        this.SetDefaultImageOnError = this.SetDefaultImageOnError.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
        this.calculDamage = this.calculDamage.bind(this);

        this.state = {
            filteredItems: this.props.items,
            items : this.props.items,
            searchedTerm : ''
        }
    }

    componentDidUpdate(prevProps)
    {
        if (this.props.items !== prevProps.items) {
            this.setState({
                ...this.state,
                items : this.props.items,
                filteredItems : this.props.items})
        }
    }

    SetDefaultImageOnError(event)
    {
        var defaultImageUrl =  `${window.location.origin.toString()}/http_code_404_error.jpg`;

        event.target.src = defaultImageUrl;
    }

    calculDamage(minMin, minMax, maxMin, maxMax)
    {
        return minMin === minMax && maxMin === maxMax ?
            `${Math.min(minMin, maxMin)}-${Math.max(minMin, maxMin)}` :
            `${Math.min(minMin, maxMin)}-${Math.min(maxMax, maxMin)} to ${Math.min(maxMax, minMax)}-${Math.max(maxMax, minMax)}`;
    }

    render()
    {
        var self = this;
        const data =
        {
            columns:
            [
                {
                    label: 'Name',
                    field: 'Name',
                    sort : 'disabled',
                    width: 100
                },
                {
                    label: 'Stats',
                    field: 'Stats',
                    sort : 'disabled'
                },
                {
                    label: 'Level Required',
                    field: 'LevelRequired',
                    sort: 'asc',
                    width: 10
                }
            ]
        };
        var searchTerm = this.state.searchedTerm;
        var rows =
            orderBy(this.state.filteredItems, ['Name'])
            .map(function(item)
            {
                const attributes = item.Properties
                    .map(property =>
                    {
                        var min = Math.round(Math.min(property.Minimum, property.Maximum));
                        var max = Math.round(Math.max(property.Minimum, property.Maximum));
                        var value = '';

                        if (property.Par > 0)
                            value = property.Par;
                        else if (min === max)
                            value = min;
                        else if (min < 0 && max < 0)
                            value = `${max} To ${min}`;
                        else if (max < 0)
                            value =`${min} To ${max}`;
                        else
                            value =`${min}-${max}`;

                        if (value === 0)
                            value = '';

                        if (!isNaN(parseInt(value)) && parseInt(value) < 0)
                            property.FirstChararacter = '';

                        var isPercent = (property.IsPercent && value !== '' ? '%' : '');
                        var valueDisplayed = `${value}${isPercent} `;

                        if (valueDisplayed === ' ')
                            valueDisplayed = '';

                        var propertyDisplay = property.FirstChararacter +   valueDisplayed.replace('--', ' To -') + property.FormattedName.replace('--', ' To -');
                        return <div key={property.Id} className="diablo-attribute"> <Highlight text={propertyDisplay} searchTerm={searchTerm} textColor="#6f5df7"/><br/></div>
                    });

                var defense  = item.MaximumDefenseMinimum === item.MaximumDefenseMaximum ? item.MaximumDefenseMinimum :`${Math.min(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}-${Math.max(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}`;

                var oneHandDamage = self.calculDamage(item.MinimumOneHandedDamageMinimum, item.MinimumOneHandedDamageMaximum, item.MaximumOneHandedDamageMinimum, item.MaximumOneHandedDamageMaximum);
                var twoHandDamage = self.calculDamage(item.MinimumTwoHandedDamageMinimum, item.MinimumTwoHandedDamageMaximum, item.MaximumTwoHandedDamageMinimum, item.MaximumTwoHandedDamageMaximum);

                var itemFormatted =   <>
                    <div className="item" style={styles} key={item.Id }>
                            <div className="unique">
                                <Highlight text={item.Name} searchTerm={searchTerm} textColor="#c7b790ed"/><br/>
                                <Highlight text={item.Type} searchTerm={searchTerm} textColor="#c7b790ed"/>
                                </div>
                                <div>
                                {item.MaximumDefenseMinimum > 0 ? <div>Defense : <span className="diablo-attribute">{defense}</span></div> : ''}
                                {item.MinimumOneHandedDamageMinimum > 0 ? <div>One-Hand Damage : <span className="diablo-attribute">{oneHandDamage}</span></div> : ''}
                            {item.MinimumTwoHandedDamageMinimum > 0 ? <div>Two-Hand Damage : <span className="diablo-attribute">{twoHandDamage}</span></div> : ''}
                                </div>
                                <div className="required-attribute">
                            {item.StrengthRequired > 0 ? <div>Required Strength : {item.StrengthRequired} </div> : ''}
                            {item.DexterityRequired > 0 ? <div>Required Dexterity : {item.DexterityRequired} </div> : ''}
                            {item.LevelRequired > 0 ? <div>Required Level : {item.LevelRequired} </div> : ''}
                        </div>
                        <div>
                            {attributes}
                        </div>

                    </div>
                </>;

                var width = null;

                if (item.ImageName === "amu1") {
                    item.ImageName = 'amu' + maths.random(1, 3).toString();
                    width = '40px';
                }
                if (item.ImageName === "ring1")
                {
                    item.ImageName = 'ring' + maths.random(1, 5).toString();
                    width = '40px';
                }
                const imageStyle = {
                    width: width,
                };

                var imageUrl = window.location.origin.toString() + '/' + item.ImageName + '.gif';

                //var defaultImageUrl = window.location.origin.toString() + '/longbattlebow.gif';
                var itemName = <>
                   <Highlight text={item.Name} searchTerm={searchTerm}/>
                    <img className="item-image border info rounded mb-0" src={imageUrl}  style={width !== null ? imageStyle : styles } onError={self.SetDefaultImageOnError}  alt="testImage.." />
                </>;

                return {
                    Name : itemName ,
                    Item : itemFormatted,
                    LevelRequired : item.LevelRequired,
                }
       });

        data.rows = orderBy(rows
            .map(function(item) {
                return {
                    'Name': item.Name,
                    'Stats': item.Item,
                    'LevelRequired' : item.LevelRequired,
                };
            }), ['LevelRequired']);

        const mock = jest.fn(() => []);

        return (
            <>
                <div id="item-filter-view">
                    <MDBView >
                        <MDBMask className="d-flex justify-content-center align-items-center gradient">
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol>
                                        <Search
                                            searchFilter={this.searchFilter}
                                            elements={this.state.items}
                                            onSearch={this.onSearch}/>
                                        <MDBDataTable
                                            className="item"
                                            style={styles}
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

    onSearch(searchResult)
    {
        this.setState({
            items : this.props.items,
            filteredItems : searchResult.elements,
            searchTerm : searchResult.searchTerm
        })
    }

    searchFilter(item, searchTerm)
    {
        var term = searchTerm.toLowerCase();

        this.setState({
            ...this.state,
            searchedTerm : term
        });

        return  item.Name.toLowerCase().includes(term) ||
                item.Type.toLowerCase().replace("_", " ").includes(term) ||
                item.Category.toLowerCase().replace("_", " ").includes(term) ||
                item.SubCategory.toLowerCase().replace("_", " ").includes(term) ||
                some(item.Properties, (property) => property.FormattedName.toLowerCase().includes(term));
    }
}

export default ItemViewer;
