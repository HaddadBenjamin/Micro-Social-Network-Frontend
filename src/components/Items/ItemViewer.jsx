import React from "react";
import { orderBy } from 'lodash'
import * as style from './ItemViewer.css'
import {
    MDBDataTable,
    MDBContainer,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol
} from 'mdbreact';
import {connect} from "react-redux";

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
                    sort: 'asc',
                    width: 150
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
                    width: 50
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
                        var value = property.Par > 0 ? property.Par : (property.Minimum === property.Maximum ? `${property.Minimum}` :
                            `${Math.min(property.Minimum, property.Maximum)}-${Math.max(property.Minimum, property.Maximum)}`)

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

                var defense  = item.MaximumDefenseMinimum === item.MaximumDefenseMaximum ? item.MaximumDefenseMinimum :`${item.MaximumDefenseMinimum}-${item.MaximumDefenseMaximum}`;
                var oneHandDamage = item.MinimumOneHandedDamageMinimum === item.MinimumOneHandedDamageMaximum && item.MaximumOneHandedDamageMinimum === item.MaximumOneHandedDamageMaximum ?
                    `${item.MinimumOneHandedDamageMinimum}-${item.MaximumOneHandedDamageMinimum}` :
                    `${item.MinimumOneHandedDamageMinimum}-${item.MaximumOneHandedDamageMinimum} to ${item.MinimumOneHandedDamageMaximum}-${item.MaximumOneHandedDamageMaximum}`;
                var twoHandDamage = item.MinimumTwoHandedDamageMinimum === item.MinimumTwoHandedDamageMaximum && item.MaximumTwoHandedDamageMinimum === item.MaximumTwoHandedDamageMaximum ?
                    `${item.MinimumTwoHandedDamageMinimum}-${item.MaximumTwoHandedDamageMinimum}` :
                    `${item.MinimumTwoHandedDamageMinimum}-${item.MaximumTwoHandedDamageMinimum} to ${item.MinimumTwoHandedDamageMaximum}-${item.MaximumTwoHandedDamageMaximum}`;

                var itemFormatted =   <>
                    <div className="item" style={style} key={item.Id }>

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
                var imageUrl = window.location.origin.toString() + '/' + item.ImageName + '.gif';
                console.log(self);
                var itemName = <>
                    {item.Name}
                    <img className="item-image border info rounded mb-0" src={imageUrl}  onError={self.SetDefaultImageOnError}  alt="testImage.." />
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

        return (
            <>
                <div id="item-filter-view">
                    <MDBView >
                        <MDBMask className="d-flex justify-content-center align-items-center gradient">
                            <MDBContainer>
                                <MDBRow>
                                    <MDBCol>
                                        <MDBDataTable
                                            className="item"
                                            style={style}
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
