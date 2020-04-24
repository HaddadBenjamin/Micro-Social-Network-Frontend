import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import React from "react";

const SettingsPage = () =>
{
    return (
        <MDBRow>
            <MDBCol
                md="5"
                className="white-text text-center text-md-left mt-xl-5 mb-5"
            >
                <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1 className="h1-responsive font-weight-bold mt-sm-5">
                        Settings
                    </h1>
                    <hr className="hr-light"/>
                    <h6 className="mb-4">
                        Welcome dear users, in this page you could configure your settings and your personal information.
                        That's mean your email, the notifications that interest you and how would you like to be notified.
                        The notification system will allow you to be alerted when something important happen, like when a new patch have been added or when someone commented your suggestion.
                        You could be notified by mail or directly in the application.
                        Thank you all for your dedication and your contribution.
                    </h6>

                </MDBAnimation>
            </MDBCol>

            <MDBCol md="5" xl="6" className="mt-xl-5 offset-md-1">
                <MDBAnimation type="fadeInRight" delay=".3s">

                </MDBAnimation>
            </MDBCol>
        </MDBRow>);
}

export default SettingsPage;