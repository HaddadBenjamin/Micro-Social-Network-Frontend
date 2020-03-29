import React from "react";
import {MDBCol} from "mdbreact";
import {filter} from 'lodash'
import "./Search.css"

export interface SearchResult<SearchResultContent>
{
    elements: SearchResultContent[],
    searchedTerm: string,
}

interface Props<SearchResultContent>
{
    elements: SearchResultContent[],
    onSearch: (elements: SearchResult<SearchResultContent>) => void,
    searchFilter: (Element: any, searchTerm: string) => boolean
}

const Search = (props: Props<any>) =>
{
    function onSearch(event: any)
    {
        props.onSearch({
            searchedTerm: event.target.value,
            elements: filter(props.elements, (element) =>
            {
                return props.searchFilter(element, event.target.value)
            })
        });
    }

    return (
        <>
            <MDBCol size="4" className="form-inline d-flex justify-content-end fa-pull-right">
                <input
                    className="form-control form-control-sm ml-3 w-75 shared-searchs py-3"
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