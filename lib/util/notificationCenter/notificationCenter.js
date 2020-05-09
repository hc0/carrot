import React from "react";
import * as noti from "notificationcenter";

/**
 * 通知中心
 * @version 0.0.1
 * @author [Djoz](wework://songdun@iciyun.com)
 */
export default function NotificationCenter (Target) {
  const WithSubscription = props => (
    <div>
      <Target {...props} notification={noti} />
    </div>
  );
  WithSubscription.displayName = `Notification(${Target.name})`;
  return WithSubscription;
}
