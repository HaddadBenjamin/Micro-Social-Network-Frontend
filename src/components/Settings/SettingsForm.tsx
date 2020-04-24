import React from "react";
import './SettingsForm.css'
import "mdbreact";
import {
    MDBBtn,
    MDBInput,
} from "mdbreact";

const SettingsForm = () =>
{
return (
    <>
        <div className="white-text text-center text-md-left mt-xl-5 mb-5">


            <h4 className="h4-responsive font-weight-bold mt-sm-4">
                Personal information
            </h4>
            <MDBInput type="email" label="Email"  icon="envelope"/>
            <h4 className="h4-responsive font-weight-bold mt-sm-4">
                Notifications system
                <h6 className="py-2">Which notifications interest you ?
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="defaultChecked2" checked/>
                        <label className="custom-control-label">A new version of the game has been implemented</label>
                </div>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"/>
                        <label className="custom-control-label">A new suggestion has been added</label>
                    </div>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked/>
                        <label className="custom-control-label">Someone commented on your suggestion</label>
                    </div>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"/>
                        <label className="custom-control-label">Other information relative to this mod</label>
                    </div>
                </h6>

                <h6>How would you like to be notified ?
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="defaultChecked2" checked/>
                        <label className="custom-control-label">By mail</label>
                    </div>

                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"/>
                        <label className="custom-control-label">In the application</label>
                    </div>

                    <MDBBtn color="primary">Save</MDBBtn>
                </h6>

            </h4>
        </div>
    </>
)
};

export default SettingsForm;