import React, {
    ReactNode
} from "react";
import ApiStatus from "../../models/ApiStatus";
import {
    MDBAlert,
} from "mdbreact";

interface Props
{
    loadingStatus: ApiStatus,
    resourceName: string
    resourceToLoad:ReactNode
}

const Loader = (props: Props) =>
{
    function displayTheResourceIfLoadingStatusIsLoaded()
    {
        if (props.loadingStatus === ApiStatus.LOADED)
            return <>
                {props.resourceToLoad}
                </>
    }
    return (
        <>
            {props.loadingStatus === ApiStatus.FAILED &&
            <MDBAlert color="danger">The {props.resourceName} loading have failed.</MDBAlert>}
            {props.loadingStatus === ApiStatus.LOADING &&
            <MDBAlert color="primary">Loading the {props.resourceName} ...
                <div className="ml-2 spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </MDBAlert>}
            {displayTheResourceIfLoadingStatusIsLoaded()}
        </>
    );
}

export default Loader