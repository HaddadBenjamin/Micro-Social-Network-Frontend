export default interface IUserItem
{
    Id : string,
    Email : string,
    NotificationSetting : INotificationSettingItem
}

interface INotificationSettingItem
{
    Id : string,
    AcceptedNotifications : string[],
    AcceptedNotifiers : string[],
    UserNotifications : IUserNotificationItem[]
}

export interface IUserNotificationItem
{
    Id : string,
    Title : string,
    Content : string,
    Type : string,
    HaveBeenRead : boolean
}