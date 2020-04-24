import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState
} from "react";
import './SettingsForm.css'
import "mdbreact";
import {
    MDBBtn,
    MDBDataTable,
    MDBInput,
} from "mdbreact";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {IGlobalState} from "../../reducers";
import IUserItem from "../../models/User";
import {
    createUser,
    getIp
} from "../../actions/user.action";
import ApiStatus from "../../models/ApiStatus";
import Loader from "../../shared/components/Loader";

const SettingsForm = () =>
{
    const userFromServer = useSelector<IGlobalState, IUserItem | undefined>(state => state.user.user);
    const creatingUserStatus = useSelector<IGlobalState, ApiStatus>(state => state.user.creatingUserStatus);
    const userId = useSelector<IGlobalState, string>(state => state.user.userId);
    const [acceptedNotifications, setAcceptedNotifications] = useState<string[]>([]);
    const [acceptedNotifiers, setAcceptedNotifiers] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(getIp());
    }, []);

    useEffect(() =>
    {
        if (userId != '')
            dispatch(createUser(userId))
    }, [userId]);

    useEffect(() =>
    {
        if (userFromServer != undefined)
        {
            setEmail(userFromServer.Email);
            setAcceptedNotifications(userFromServer.NotificationSetting.AcceptedNotifications);
            setAcceptedNotifiers(userFromServer.NotificationSetting.AcceptedNotifiers);
        }
    }, [userFromServer]);

    function onChangeEmail(event: FormEvent<HTMLInputElement>): void
    {
        setEmail(event.currentTarget.value);
    }

    function doesNotificationIsEnabled(notification : string)
    {
        return acceptedNotifications.includes(notification);
    }

    function doesNotifierIsEnabled(notifier : string)
    {
        return acceptedNotifiers.includes(notifier);
    }

    function getUserForm()
    {
        if (userFromServer != undefined)
        return (
            <>
                <h4 className="h4-responsive font-weight-bold mt-sm-4">
                    Personal information
                </h4>
                <MDBInput type="email" label="Email"  icon="envelope" value={email} onChange={onChangeEmail}/>
                <h4 className="h4-responsive font-weight-bold mt-sm-4">
                    Notifications system
                    <h6 className="py-2">Which notifications interest you ?
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultChecked2" checked={doesNotificationIsEnabled('PatchNotes')}/>
                            <label className="custom-control-label">A new version of the game has been implemented</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" checked={doesNotificationIsEnabled('CreatedSuggestion')}/>
                            <label className="custom-control-label">A new suggestion has been added</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" checked={doesNotificationIsEnabled('NewCommentOnYourSuggestion')}/>
                            <label className="custom-control-label">Someone commented on your suggestion</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" checked={doesNotificationIsEnabled('Other')}/>
                            <label className="custom-control-label">Other information relative to this mod</label>
                        </div>
                    </h6>

                    <h6>How would you like to be notified ?
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="defaultChecked2"  checked={doesNotifierIsEnabled('Mail')}/>
                            <label className="custom-control-label">By mail</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"  checked={doesNotifierIsEnabled('InApp')}/>
                            <label className="custom-control-label">In the application</label>
                        </div>

                        <MDBBtn color="primary">Save</MDBBtn>
                    </h6>

                </h4>
            </>);

            return (<></>);
    }
    return (
    <>
        <div className="white-text text-center text-md-left mt-xl-5 mb-5">
            <Loader
                loadingStatus={creatingUserStatus}
                resourceName="user"
                resourceToLoad={getUserForm()}/>
        </div>
    </>
)
};

export default SettingsForm;