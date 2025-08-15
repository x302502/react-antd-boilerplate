import type { RoleItemType } from './types';
import { fakeApiConnector } from '~/connectors';

export * from './types';

const ENDPOINT = {
  LIST: 'api/role-list',
  ADD: 'api/role-item',
  UPDATE: 'api/role-item',
  DELETE: 'api/role-item',
  LIST_ROLE_MENU: 'api/role-menu',
  MENU_BY_ROLE_ID: 'api/menu-by-role-id',
};
class RoleApi {
  /* Get role list */
  list(data: any) {
    return fakeApiConnector.get<ApiListResponse<RoleItemType>>(ENDPOINT.LIST, { searchParams: data });
  }

  /* Add role */
  add(body: RoleItemType) {
    return fakeApiConnector.post<string>(ENDPOINT.ADD, body);
  }

  /* Update role */
  update(body: RoleItemType) {
    return fakeApiConnector.put<string>(ENDPOINT.UPDATE, body);
  }

  /* Delete role */
  delete(id: number) {
    return fakeApiConnector.delete<string>(ENDPOINT.DELETE, {
      params: { id },
    });
  }

  /* Get menus */
  listRoleMenu() {
    return fakeApiConnector.get<RoleItemType[]>(ENDPOINT.LIST_ROLE_MENU);
  }

  /* Menu IDs bound to role */
  menuByRoleId(params: { id: number }) {
    return fakeApiConnector.get<string[]>(ENDPOINT.MENU_BY_ROLE_ID, {
      searchParams: params,
    });
  }
}

export const roleApi = new RoleApi();
