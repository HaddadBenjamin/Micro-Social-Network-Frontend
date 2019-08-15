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
    searchFilter: (Element : any, searchTerm : string) => boolean
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
        this.props.onSearch({
            searchedTerm: event.target.value,
            elements: filter(this.props.elements, (element) => { return this.props.searchFilter(element, event.target.value) })
        });
    }

    render()
    {
        return (
            <>
                <MDBCol md="12" className="form-inline d-flex justify-content-end">
                    <label>Search
                    <input className="form-control form-control-sm ml-3 w-75"
                           type="text" placeholder="Search"
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