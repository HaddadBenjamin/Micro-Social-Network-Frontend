import React, {
    FormEvent,
    SyntheticEvent,
    useEffect,
    useState
} from "react";
import './SettingsForm.css'
import "mdbreact";
import {
    MDBBtn,
    MDBInput,
} from "mdbreact";
import {
    useDispatch,
    useSelector
} from "react-redux";
import {IGlobalState} from "../../reducers";
import IUserItem from "../../models/User";
import {
    updateUser
} from "../../actions/user.action";
import ApiStatus from "../../shared/models/ApiStatus";
import Loader from "../../shared/components/Loader";
import {
    filter,
    noop
} from 'lodash'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../shared/css/toastify.css'

const SettingsForm = () =>
{
    const userFromServer = useSelector<IGlobalState, IUserItem | undefined>(state => state.user.user);
    const userId = useSelector<IGlobalState, string>(state => state.user.userId);
    const errorMessage = useSelector<IGlobalState, string>(state => state.user.errorMessage);
    const identifyingUserStatus = useSelector<IGlobalState, ApiStatus>(state => state.user.identifyingUserStatus);
    const updatingUserStatus = useSelector<IGlobalState, ApiStatus>(state => state.user.updatingUserStatus);

    const [acceptedNotifications, setAcceptedNotifications] = useState<string[]>([]);
    const [acceptedNotifiers, setAcceptedNotifiers] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const dispatch = useDispatch();

    useEffect(() =>
    {
        if (updatingUserStatus === ApiStatus.FAILED)
            toast.error(errorMessage);
        if (updatingUserStatus === ApiStatus.LOADED && firstLoad === false)
            toast.success("Your user information have been correctly updated.");
    }, [updatingUserStatus]);

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

    function onChangeNotification(notification: string)
    {
        if (acceptedNotifications.includes(notification))
        {
            const filteredNotifications = filter(acceptedNotifications, (acceptedNotification: string) => notification !== acceptedNotification);

            setAcceptedNotifications(filteredNotifications)
        }
        else
            setAcceptedNotifications([...acceptedNotifications, notification]);
    }

    function onChangeNotifier(notifier: string)
    {
        if (acceptedNotifiers.includes(notifier))
        {
            const filteredNotifiers = filter(acceptedNotifiers, (acceptedNotifier: string) => notifier !== acceptedNotifier);

            setAcceptedNotifiers(filteredNotifiers)
        }
        else
            setAcceptedNotifiers([...acceptedNotifiers, notifier]);
    }

    function onSave(event : SyntheticEvent<HTMLButtonElement>)
    {
        if (updatingUserStatus !== ApiStatus.LOADING)
        {
            setFirstLoad(false);
            dispatch(updateUser(userId, email, acceptedNotifications, acceptedNotifiers));
            toast.info('Updating your user information...');
        }
    }

    function doesNotificationIsEnabled(notification: string)
    {
        return acceptedNotifications.includes(notification);
    }

    function doesNotifierIsEnabled(notifier: string)
    {
        return acceptedNotifiers.includes(notifier);
    }

    function getUserForm()
    {
        if (userFromServer != undefined)
        return (
            <>
                <div className="text-left">
                <h4 className="h4-responsive font-weight-bold mt-sm-4 settings-form">
                    Personal information
                </h4>
                <MDBInput type="email" label="Email"  icon="envelope" value={email} onChange={onChangeEmail}/>
                <h4 className="h4-responsive font-weight-bold mt-sm-4">Notifications system</h4>
                    <h6 className="py-2">Which notifications interest you ?
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" onChange={noop} checked={doesNotificationIsEnabled('PatchNotes')}/>
                            <label className="custom-control-label" onClick={event => onChangeNotification("PatchNotes")}>A new version of the game has been implemented</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input"  onChange={noop} value="CreatedSuggestion" checked={doesNotificationIsEnabled('CreatedSuggestion')}/>
                            <label className="custom-control-label" onClick={event => onChangeNotification("CreatedSuggestion")}>A new suggestion has been added</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" onChange={noop} value="NewCommentOnYourSuggestion" checked={doesNotificationIsEnabled('NewCommentOnYourSuggestion')}/>
                            <label className="custom-control-label" onClick={event => onChangeNotification("NewCommentOnYourSuggestion")}>Someone commented on your suggestion</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" onChange={noop} value="Other" checked={doesNotificationIsEnabled('Other')}/>
                            <label className="custom-control-label" onClick={event => onChangeNotification("Other")}>Other information relative to this mod</label>
                        </div>
                    </h6>

                    <h6>How would you like to be notified ?
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" onChange={noop} value="Mail" checked={doesNotifierIsEnabled('Mail')}/>
                            <label className="custom-control-label" onClick={event => onChangeNotifier("Mail")}>By mail</label>
                        </div>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" onChange={noop} value="InApp" checked={doesNotifierIsEnabled('InApp')}/>
                            <label className="custom-control-label" onClick={event => onChangeNotifier("InApp")}>In the application</label>
                        </div>

                        <MDBBtn color="primary" onClick={onSave}>Save</MDBBtn>
                    </h6>
                </div>
            </>);

            return (<></>);
    }

    return (
    <>
        <div className="white-text text-center text-md-left mt-xl-5 mb-5">
            <Loader
                loadingStatus={identifyingUserStatus}
                resourceName="user"
                resourceToLoad={getUserForm()}/>
        </div>
    </>
)
};

export default SettingsForm;