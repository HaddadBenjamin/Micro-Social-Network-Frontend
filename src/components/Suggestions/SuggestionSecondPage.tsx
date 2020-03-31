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
                            <MDBListGroup center>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center">Cras
                                    justo odio<MDBBadge color="primary"
                                                        pill>14</MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center">Dapibus
                                    ac facilisis in<MDBBadge
                                        color="primary" pill>2</MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem className="d-flex justify-content-between align-items-center">Morbi
                                    leo risus<MDBBadge color="primary"
                                                       pill>1</MDBBadge>
                                </MDBListGroupItem>
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