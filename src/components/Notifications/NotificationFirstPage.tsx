import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import React from "react";

const NotificationFirstPage = () =>
{
    return (
        <MDBRow>
            <MDBCol
                md="5"
                className="white-text text-center text-md-left mt-xl-5 mb-5"
            >
                <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1 className="h1-responsive font-weight-bold mt-sm-5">
                        Notifications
                    </h1>
                    <hr className="hr-light"/>
                    <h6 className="mb-4">
                        Welcome dear users, on this page you can see the notifications inside the application for which you shared an interest.
                        In order to the notifications correctly appear, you have to check the checkbox « in the application » to the question « how would you like to be notified ? » from the settings page.
                        Thank you all for your dedication and your contribution.
                    </h6>
                </MDBAnimation>
            </MDBCol>
        </MDBRow>);
}

export default NotificationFirstPage;