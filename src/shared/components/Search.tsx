import React, {Component} from "react";
import {MDBCol } from "mdbreact";
import {filter } from 'lodash'

export interface SearchResult<Element>
{
    elements : Element[],
    searchedTerm : string,
}

interface Props<Element>
{
    elements : Element[],
    onSearch : (elements : SearchResult<Element>) => void,
    searchFilter: (Element : any) => boolean
}

class Search extends Component<Props<Element>, {}>
{
    constructor(props : Props<Element>)
    {
        super(props);

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(event : any)
    {
        console.log(this.props);
        this.props.onSearch({
            searchedTerm: event.target.value,
            elements: filter(this.props.elements, this.props.searchFilter)
        });
    }

    render()
    {
        return (
            <>
                <MDBCol md="12" className="form-inline d-flex justify-content-end">
                    <label>Search
                    <input className="form-control form-control-sm ml-3 w-75"
                           type="text" placeholder="Search (Work in progress)"
                           aria-label="Search"
                           onChange={this.onSearch} />
                    </label>
                </MDBCol>
                <div className="py-2"></div>
            </>
        )
    }
}

export default Search;