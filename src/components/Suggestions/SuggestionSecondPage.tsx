import {MDBContainer, MDBListGroup, MDBListGroupItem, MDBBadge, MDBView, MDBMask, MDBRow} from "mdbreact";
import React from "react";
import './SuggestionSecondPage.css'

const SuggestionSecondPage = () =>
{
    return (
        <>
        <div id="item-filter-view">
            <MDBView>
                <MDBMask className="d-flex justify-content-center align-items-center gradient">
                    <MDBContainer>
                        <MDBRow >
                            <MDBListGroup className="d-flex  col-md-12 align-top">>
                                <MDBListGroupItem className="suggestion d-flex justify-content-between align-items-center">Add set items a runewords in the website 🙂<MDBBadge color="primary" pill>6</MDBBadge></MDBListGroupItem>
                                <MDBListGroupItem className="suggestion d-flex justify-content-between align-items-center">Balance the classes 🐻<MDBBadge color="danger" pill>-2</MDBBadge></MDBListGroupItem>
                                <MDBListGroupItem className="suggestion d-flex justify-content-between align-items-center">Add new areas 🏝️<MDBBadge color="default" pill>0</MDBBadge></MDBListGroupItem>
                            </MDBListGroup>
                            </MDBRow>
                    </MDBContainer>
                </MDBMask>
            </MDBView>
        </div>
            </>
);
}

export default SuggestionSecondPage;