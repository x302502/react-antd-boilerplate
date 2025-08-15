import type { ButtonProps } from 'antd';
import type { NotificationItem } from '~/api/notifications/types';

import { useEffect, useState } from 'react';
import { NotificationPopup } from './index';
import { notificationApi } from '~/api/notifications';

export function NotificationContainer({ ...restProps }: ButtonProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    notificationApi.list().then(res => {
      setNotifications(Array.from({ length: 20 }).flatMap(() => res));
    });
  }, []);

  return <NotificationPopup notifications={notifications} {...restProps} />;
}
