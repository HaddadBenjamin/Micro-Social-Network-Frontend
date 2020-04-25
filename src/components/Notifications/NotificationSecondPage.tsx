import {
    MDBCol,
    MDBContainer,
    MDBDataTable,
    MDBMask,
    MDBRow,
    MDBView
} from "mdbreact";
import React from "react";
import Loader from "../../shared/components/Loader";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../reducers";
import ApiStatus from "../../models/ApiStatus";
import {IUserNotificationItem} from "../../models/User";
import {map} from 'lodash'
import './NotificationSecondPage.css'
import '../../shared/css/toastify.css'

const NotificationSecondPage = () =>
{
    const creatingUserStatus = useSelector<IGlobalState, ApiStatus>(state => state.user.creatingUserStatus);
    const notifications = useSelector<IGlobalState, IUserNotificationItem[]>(state => state.user.user.NotificationSetting.UserNotifications);

    function getNotificationDataTable(): any
    {
        return {
            columns: getNotificationDataTableColumns(),
            rows: getNotificationDataTableRows(),
            responsive : true
        };
    }

    function getNotificationDataTableColumns(): any
    {
        return [
            {
                label: 'Title',
                field: 'Title',
                sort: 'disabled',
            },
            {
                label: 'Content',
                field: 'Content',
                sort: 'disabled',
            }
        ];
    }

    function getNotificationDataTableRows(): any
    {
        return map(notifications, toNotificationDataTableRow);
    }

    function toNotificationDataTableRow(notification: IUserNotificationItem)
    {
        const title = <p className="notification-title">{notification.Title}</p>;
        const content = <p className="notification-content">{notification.Content}</p>;

        return {
            'Title' : title,
            'Content': content
        };
    }

    return (
        <>
            <div id="item-filter-view">
                <MDBView>
                    <MDBMask className="d-flex justify-content-center align-items-center gradient">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol>
                                    <Loader
                                        loadingStatus={creatingUserStatus}
                                        resourceName="notifications"
                                        resourceToLoad={<MDBDataTable data={getNotificationDataTable()} entries={3}/>}
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
        </>
    );
}

export default NotificationSecondPage;