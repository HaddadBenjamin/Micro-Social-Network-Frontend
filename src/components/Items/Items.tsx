import React, {Component} from 'react';
import ItemViewer from './ItemViewer'

class Items extends Component<{}, {}>
{
    public constructor(props : any)
    {
        super(props);
    }

    render()
    {
        return (
            <>
                <ItemViewer searchTerm={''}/>
            </>)
    }
}

export default Items;

