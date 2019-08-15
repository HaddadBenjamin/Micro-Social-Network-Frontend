import React, {Component} from "react";
import {MDBCol } from "mdbreact";

interface Props
{
    items : any[],
    onSearch : () => any[]
}
interface State
{
    searchTerm : string
}

class Search extends Component<Props, State>
{
    render()
    {
        return (
            <>
                <MDBCol md="12" className="form-inline d-flex justify-content-end">
                    <label>Search
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search (Work in progress)" aria-label="Search" />
                    </label>
                </MDBCol>
                <div className="py-2"></div>
            </>
        )
    }
}

export default Search;