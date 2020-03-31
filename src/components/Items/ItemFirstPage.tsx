import {MDBAnimation, MDBCol, MDBRow} from "mdbreact";
import SearchItem from "./SearchItem";
import {DefaultSearchItemDto} from "./SearchItemDto";
import React from "react";

const ItemFirstPage = () =>
{
    return (
    <MDBRow>
        <MDBCol
            md="5"
            className="white-text text-center text-md-left mt-xl-5 mb-5"
        >
            <MDBAnimation type="fadeInLeft" delay=".3s">
                <h1 className="h1-responsive font-weight-bold mt-sm-5">
                    ITEMS
                </h1>
                <hr className="hr-light"/>
                <h6 className="mb-4">
                    It’s in your best interest to bedeck yourself in quality pieces of
                    equipment. Belts, rings, sandals and similar accoutrements aren’t just for
                    looking good - these items are often enchanted to make you swifter or safer.
                    Some can even enhance your skills.
                </h6>

            </MDBAnimation>
        </MDBCol>

        <MDBCol md="5" xl="6" className="mt-xl-5 offset-md-1">
            <MDBAnimation type="fadeInRight" delay=".3s">
                <SearchItem search={DefaultSearchItemDto}/>
            </MDBAnimation>
        </MDBCol>
    </MDBRow>);
}

export default ItemFirstPage;