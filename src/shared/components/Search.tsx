import React from "react";
import {MDBCol} from "mdbreact";
import {filter} from 'lodash'
import "./Search.css"

interface Props<SearchResult>
{
    elements: SearchResult[],
    onSearch: (searchedElements: SearchResult[], searchedTerm: string) => void,
    searchFilter: (searchElement: any, searchTerm: string) => boolean
}

const Search = (props: Props<any>) =>
{
    function onSearch(event: any)
    {
        const searchedElements = filter(props.elements, (element) =>
        {
            return props.searchFilter(element, event.target.value)
        });

        props.onSearch(searchedElements, event.target.value);
    }

    return (
        <>
            <MDBCol size="4" className="form-inline d-flex justify-content-end fa-pull-right">
                <input
                    className="form-control form-control-sm ml-3 w-75 shared-search py-3"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={onSearch}/>
            </MDBCol>
            <div className="py-4"></div>
        </>
    )
}

export default Search;