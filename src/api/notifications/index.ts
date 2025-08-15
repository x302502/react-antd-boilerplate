import type { NotificationItem } from '~/api/notifications/types';
import { fakeApiConnector } from '~/connectors';

const ENDPOINT = {
  LIST: 'api/notifications',
};

class NotificationApi {
  list() {
    return fakeApiConnector.get<NotificationItem[]>(ENDPOINT.LIST);
  }
}

export const notificationApi = new NotificationApi();
