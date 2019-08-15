import React, {Component} from 'react';
import ItemViewer from './ItemViewer'

interface Props {
}
interface State
{
//
}

class Items extends Component<Props, State>
{
    public constructor(props : Props)
    {
        super(props);
    }

    render()
    {

        return (
            <>
                <ItemViewer Items={[]}></ItemViewer>
            </>)
    }
}

export default Items;

