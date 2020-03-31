import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import React from "react";

const SuggestionFirstPage = () =>
{
    return (
        <MDBRow>
            <MDBCol
                md="5"
                className="white-text text-center text-md-left mt-xl-5 mb-5"
            >
                <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1 className="h1-responsive font-weight-bold mt-sm-5">
                        Suggestions
                    </h1>
                    <hr className="hr-light"/>
                    <h6 className="mb-4">
                        Welcome dear users, in this page you could create some suggestions about the game and the
                        website. We would like to know what do you think to make it count in during the development of our tools. To help us to determine which
                        suggestions are the most important for you, there is an integrated vote system. Thank you all for your dedication and your contribution.
                    </h6>

                </MDBAnimation>
            </MDBCol>

            <MDBCol md="5" xl="6" className="mt-xl-5 offset-md-1">
                <MDBAnimation type="fadeInRight" delay=".3s">

                </MDBAnimation>
            </MDBCol>
        </MDBRow>);
}

export default SuggestionFirstPage;