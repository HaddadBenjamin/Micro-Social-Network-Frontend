import React, {Component} from "react";
import {MDBCol } from "mdbreact";
import {filter } from 'lodash'
import Item from "../../components/Items/Item";

export interface SearchResult
{
    elements : Item[],
    searchedTerm : string,
}

interface Props
{
    elements : Item[],
    onSearch : (elements : SearchResult) => void,
    searchFilter: (Element : any, searchTerm : string) => boolean
}

class Search extends Component<Props, {}>
{
    constructor(props : Props)
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
                <MDBCol size="4" className="form-inline d-flex justify-content-end fa-pull-right">
                    <input
                           style={{
                               "fontFamily" : "Diablo",
                               "fontSize": "15.4px",
                                "color" : "white",
                                "boxShadow" : "2px 2px 4px 0.1px #eb0d26",
                                "backgroundColor" : "rgba(1, 1, 1, 0.8)",
                                "border" : "0.05em solid white"}}
                           className="form-control form-control-sm ml-3 w-75 shared-searchs py-3"
                           type="text"
                           placeholder="Search"
                           aria-label="Search"
                           onChange={this.onSearch} />
                </MDBCol>
                <div className="py-4"></div>
            </>
        )
    }
}

export default Search;