import React from "react";
import { orderBy } from 'lodash'
import styles  from './ItemViewer.css'
import {
    MDBDataTable,
    MDBContainer,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol
} from 'mdbreact';
import {connect} from "react-redux";
import maths from '../../shared/utilities/maths'
import Search from '../../shared/components/Search'
import jest from 'jest-mock'

class ItemViewer extends React.Component {
    constructor(props) {
        super(props);

        this.SetDefaultImageOnError = this.SetDefaultImageOnError.bind(this);
    }

    SetDefaultImageOnError(event)
    {
        var defaultImageUrl =  window.location.origin.toString() + '/' +  'http_code_404_error.jpg';

        event.target.src = defaultImageUrl;
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
        // 3) revoir l’affichage : fond sombre
        // rendu en flexbox
        var rows =
            orderBy(this.props.Items, ['Name'])
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
                        else if (min == max)
                            value = min;
                        else if (min < 0 && max < 0)
                            value = `${max} To ${min}`;
                        else if (max < 0)
                            value =`${min} To ${max}`;
                        else
                            value =`${min}-${max}`;

                        if (value == '0')
                            value = '';

                        if (!isNaN(parseInt(value)) && parseInt(value) < 0)
                            property.FirstChararacter = '';

                        var isPercent = (property.IsPercent && value !== '' ? '%' : '');
                        var valueDisplayed = `${value}${isPercent} `;

                        if (valueDisplayed === ' ')
                            valueDisplayed = '';

                        return <div key={property.Id} className="diablo-attribute">{property.FirstChararacter}{valueDisplayed.replace('--', ' To -')}{property.FormattedName}</div>
                    });

                var defense  = item.MaximumDefenseMinimum === item.MaximumDefenseMaximum ? item.MaximumDefenseMinimum :`${Math.min(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}-${Math.max(item.MaximumDefenseMinimum, item.MaximumDefenseMaximum)}`;
                var oneHandDamage = item.MinimumOneHandedDamageMinimum === item.MinimumOneHandedDamageMaximum && item.MaximumOneHandedDamageMinimum === item.MaximumOneHandedDamageMaximum ?
                    `${Math.min(item.MinimumOneHandedDamageMinimum, item.MaximumOneHandedDamageMinimum)}-${Math.max(item.MinimumOneHandedDamageMinimum, item.MaximumOneHandedDamageMinimum)}` :
                    `${Math.min(item.MinimumOneHandedDamageMinimum, item.MaximumOneHandedDamageMinimum)}-${Math.max(item.MinimumOneHandedDamageMinimum, item.MaximumOneHandedDamageMinimum)} to ${Math.min(item.MaximumOneHandedDamageMaximum, item.MinimumOneHandedDamageMaximum)}-${Math.max(item.MaximumOneHandedDamageMaximum, item.MinimumOneHandedDamageMaximum)}`;
                var twoHandDamage = item.MinimumTwoHandedDamageMinimum === item.MinimumTwoHandedDamageMaximum && item.MaximumTwoHandedDamageMinimum === item.MaximumOneHandedDamageMaximum ?
                    `${Math.min(item.MinimumTwoHandedDamageMinimum, item.MaximumTwoHandedDamageMinimum)}-${Math.max(item.MinimumTwoHandedDamageMinimum, item.MaximumTwoHandedDamageMinimum)}` :
                    `${Math.min(item.MinimumTwoHandedDamageMinimum, item.MaximumTwoHandedDamageMinimum)}-${Math.max(item.MinimumTwoHandedDamageMinimum, item.MaximumTwoHandedDamageMinimum)} to ${Math.min(item.MaximumTwoHandedDamageMaximum, item.MinimumTwoHandedDamageMaximum)}-${Math.max(item.MaximumTwoHandedDamageMaximum, item.MinimumTwoHandedDamageMaximum)}`;

                var itemFormatted =   <>
                    <div className="item" style={styles} key={item.Id }>

                        <div className="unique"> {/*qualité lié à la qualité e l'objet et revoit la couleur */}
                            {item.Name} <br/>
                            {item.Type}
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

                console.log(item.Properties)
                var width = null;

                if (item.ImageName == "amu1") {
                    item.ImageName = 'amu' + maths.random(1, 3).toString();
                    width = '40px';
                }
                if (item.ImageName == "ring1")
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
                    {item.Name}
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
                                        <Search items={[]} onSearch={mock}/>
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
}
const mapStateToProps = function (state)
{
    return {
        Items: state.searchItems.items
    };
};

export default connect(mapStateToProps)(ItemViewer)
