import React, {Component} from 'react';
import ItemViewer from './ItemViewer'
import {connect} from "react-redux";
import {GlobalState} from '../../store/store';
import Item from './Item';

interface Props
{
    items : Item[]
}
class Items extends Component<Props, {}>
{
    public constructor(props : any)
    {
        super(props);
    }

    render()
    {
        return (
            <>
                <ItemViewer items={this.props.items} searchTerm={''}/>
            </>)
    }
}

const mapStateToProps = function (state : GlobalState)
{
    return {
        items: state.searchItems.items
    };
};

export default connect(mapStateToProps)(Items)

