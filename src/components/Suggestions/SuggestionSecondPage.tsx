import {
    MDBContainer,
    MDBListGroupItem,
    MDBBadge,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBDataTable, MDBInput
} from "mdbreact";
import React from "react";
import './SuggestionSecondPage.css'
import '../Items/ItemSecondPage.css'

const SuggestionSecondPage = () =>
{
    function getItemDataTable(): any
    {
        return {
            columns: getItemDataTableColumns(),
            rows: getItemDataTableRows()
        };
    }

    function getItemDataTableColumns(): any
    {
        return [
            {
                label: 'Content',
                field: 'Content',
                sort: 'disabled'
            },
            {
                label: 'Rate',
                field: 'Rate',
                sort: 'disabled',
                width: 20
            },
            {
                label: '',
                field: 'VotePositively',
                width: 10,
                sort: 'disabled'
            },
            {
                label: '',
                field: 'VoteNegatively',
                width: 10,
                sort: 'disabled'
            }
        ];
    }

    function getItemDataTableRows(): any
    {
        return [
            {

                'Content': <MDBListGroupItem
                    className="suggestion d-flex justify-content-between align-items-center">Add set
                    items and runewords to the website 🙂</MDBListGroupItem>,
                'Rate': <p className="suggestion positive-vote">6</p>,
                'VotePositively': <i className="fas fa-thumbs-up thumbs-up"></i>,
                'VoteNegatively': <i className="fas fa-thumbs-down thumbs-down" ></i>,
            },
            {
                'Content': <MDBListGroupItem
                    className="suggestion d-flex justify-content-between align-items-center">Balance all the classes 🐻</MDBListGroupItem>,
                'Rate': <p className="suggestion default-vote">0</p>,
                'VotePositively': <i className="fas fa-thumbs-up thumbs-up"></i>,
                'VoteNegatively': <i className="fas fa-thumbs-down thumbs-down" ></i>,
            },
            {
                'Content': <MDBListGroupItem
                    className="suggestion d-flex justify-content-between align-items-center">Create news areas for the end game 🏝️</MDBListGroupItem>,
                'Rate': <p className="suggestion thumbs-down">-2</p>,
                'VotePositively': <i className="fas fa-thumbs-up thumbs-up"></i>,
                'VoteNegatively': <i className="fas fa-thumbs-down thumbs-down" ></i>,
            },
        ];
    }

    return (
        <>
            <div id="item-filter-view">
                <MDBView>
                    <MDBMask className="d-flex justify-content-center align-items-center gradient">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <MDBDataTable
                                        data={getItemDataTable()}
                                        entries={15}/>
                                    <MDBCol/>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <input type="text" className="form-control create-suggestion" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" placeholder="Enter email"/>
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
        </>
    );
}

export default SuggestionSecondPage;