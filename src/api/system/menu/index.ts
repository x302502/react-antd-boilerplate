import type { MenuItemType } from './types';
import { fakeApiConnector } from '~/connectors';

export * from './types';

const ENDPOINT = {
  LIST: 'api/menu-list',
  ADD: 'api/menu-item',
  UPDATE: 'api/menu-item',
  DELETE: 'api/menu-item',
};

class MenuApi {
  /* Get menu list */
  list(data: any) {
    return fakeApiConnector.get<ApiListResponse<MenuItemType>>(ENDPOINT.LIST, { searchParams: data });
  }

  /* Add menu */
  add(body: MenuItemType) {
    return fakeApiConnector.post<string>(ENDPOINT.ADD, body);
  }

  /* Update menu */
  update(body: MenuItemType) {
    return fakeApiConnector.put<string>(ENDPOINT.UPDATE, body);
  }

  /* Delete menu */
  delete(id: number) {
    return fakeApiConnector.delete<string>(ENDPOINT.DELETE, { params: { id } });
  }
}

export const menuApi = new MenuApi();
