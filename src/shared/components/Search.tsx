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
                <MDBCol md="12" size="6" className="form-inline d-flex justify-content-end">
                    <label>
                    <input
                           style={{
                               "fontFamily" : "Diablo",
                                "fontSize": "14.4px",
                                "color" : "white",
                                "boxShadow" : "2px 2px 4px 0.1px #eb0d26",
                                "backgroundColor" : "rgba(1, 1, 1, 0.8)",
                                "border" : "0.05em solid white"}}
                           className="form-control form-control-sm ml-3 w-75 shared-search"
                           type="text"
                           placeholder="Search"
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