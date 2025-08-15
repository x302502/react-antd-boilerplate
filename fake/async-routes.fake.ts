import { defineFakeRoute } from 'vite-plugin-fake-server/client';
import { MAIN_MENU_ORDER } from '~/views/main/main-menu.order';
import { ADMIN_TOKEN } from './constants';

/**
 * roles: Page-level permissions, here we simulate two types: "admin" and "common"
 * admin: Administrator role
 * common: Regular user role
 */

const systemManagementRouter = {
  path: '/system',
  handle: {
    icon: 'SettingOutlined',
    title: 'common.menu.system',
    order: MAIN_MENU_ORDER.SYSTEM,
    roles: ['admin'],
  },
  children: [
    {
      path: '/system/user',
      handle: {
        icon: 'UserOutlined',
        title: 'common.menu.user',
        roles: ['admin'],
        permissions: ['permission:button:add', 'permission:button:update', 'permission:button:delete'],
      },
    },
    {
      path: '/system/role',
      handle: {
        icon: 'TeamOutlined',
        title: 'common.menu.role',
        roles: ['admin'],
        permissions: ['permission:button:add', 'permission:button:update', 'permission:button:delete'],
      },
    },
    {
      path: '/system/menu',
      handle: {
        icon: 'MenuOutlined',
        title: 'common.menu.menu',
        roles: ['admin'],
        permissions: ['permission:button:add', 'permission:button:update', 'permission:button:delete'],
      },
    },
    {
      path: '/system/dept',
      handle: {
        keepAlive: false,
        icon: 'ApartmentOutlined',
        title: 'common.menu.dept',
        roles: ['admin'],
        permissions: ['permission:button:add', 'permission:button:update', 'permission:button:delete'],
      },
    },
  ],
};

const homeRouter = {
  path: '/home',
  handle: {
    icon: 'HomeOutlined',
    title: 'common.menu.home',
    order: MAIN_MENU_ORDER.HOME,
  },
};

const aboutRouter = {
  path: '/about',
  handle: {
    icon: 'CopyrightOutlined',
    title: 'common.menu.about',
    order: MAIN_MENU_ORDER.ABOUT,
  },
};

const outsideRouter = {
  path: '/outside',
  handle: {
    icon: 'OutsidePageIcon',
    title: 'common.menu.outside',
    order: MAIN_MENU_ORDER.OUTSIDE,
  },
  children: [
    {
      path: '/outside/embedded',
      handle: {
        icon: 'EmbeddedIcon',
        title: 'common.menu.embedded',
      },
      children: [
        {
          path: '/outside/embedded/ant-design',
          handle: {
            icon: 'AntDesignOutlined',
            title: 'common.menu.antd',
            iframeLink: 'https://ant.design/',
          },
        },
        {
          path: '/outside/embedded/project-docs',
          handle: {
            icon: 'ContainerOutlined',
            title: 'common.menu.projectDocs',
            iframeLink: 'https://condorheroblog.github.io/react-antd-admin/docs/',
          },
        },
      ],
    },
    {
      path: '/outside/external-link',
      handle: {
        icon: 'ExternalIcon',
        title: 'common.menu.externalLink',
      },
      children: [
        {
          path: '/outside/external-link/react-docs',
          handle: {
            icon: 'ReactLogoIcon',
            title: 'common.menu.reactDocs',
            externalLink: 'https://react.dev/',
          },
        },
      ],
    },
  ],
};

const personalCenterRouter = {
  path: '/personal-center',
  handle: {
    order: MAIN_MENU_ORDER.PERSONAL_CENTER,
    title: 'common.menu.personalCenter',
    icon: 'UserCircleIcon',
  },
  children: [
    {
      path: '/personal-center/my-profile',
      handle: {
        title: 'common.menu.profile',
        icon: 'ProfileIcon',
      },
    },
    {
      path: '/personal-center/settings',
      handle: {
        title: 'common.menu.settings',
        icon: 'UserSettingsIcon',
      },
    },
  ],
};

const routeNestRouter = {
  path: '/route-nest',
  handle: {
    order: MAIN_MENU_ORDER.ROUTE_NEST,
    title: 'common.menu.nestMenus',
    icon: 'NodeExpandOutlined',
  },
  children: [
    {
      path: '/route-nest/menu1',
      handle: {
        title: 'common.menu.menu1',
        icon: 'SisternodeOutlined',
      },
      children: [
        {
          path: '/route-nest/menu1/menu1-1',
          handle: {
            title: 'common.menu.menu1-1',
            icon: 'SubnodeOutlined',
          },
        },
        {
          path: '/route-nest/menu1/menu1-2',
          handle: {
            title: 'common.menu.menu1-2',
            icon: 'SubnodeOutlined',
          },
        },
      ],
    },
    {
      path: '/route-nest/menu2',
      handle: {
        title: 'common.menu.menu2',
        icon: 'SubnodeOutlined',
      },
    },
  ],
};

const demoRouter = {
  path: '/demo',
  handle: {
    icon: 'ExperimentOutlined',
    title: 'common.menu.demo',
    order: MAIN_MENU_ORDER.DEMO,
  },
};

export default defineFakeRoute([
  {
    url: '/get-async-routes',
    timeout: 1000,
    method: 'get',
    response: ({ headers }) => {
      const userToken = headers.authorization?.split(' ')?.[1];
      const isAdmin = userToken === ADMIN_TOKEN;
      const accessRouter = {
        path: '/access',
        handle: {
          icon: 'SafetyOutlined',
          title: 'common.menu.access',
          order: MAIN_MENU_ORDER.ACCESS,
        },
        children: [
          /**
           * @zh 通过接口获取路由时可见
           * @en Visible only when getting routes through the interface
           */
          {
            path: '/access/access-mode',
            handle: {
              icon: 'CloudOutlined',
              title: 'common.menu.accessMode',
            },
          },
          {
            path: '/access/page-control',
            handle: {
              icon: 'FileTextOutlined',
              title: 'common.menu.pageControl',
            },
          },
          {
            path: '/access/button-control',
            handle: {
              icon: 'LockOutlined',
              title: 'common.menu.buttonControl',
              permissions: isAdmin
                ? [
                    'permission:button:get',
                    'permission:button:update',
                    'permission:button:delete',
                    'permission:button:add',
                  ]
                : ['permission:button:get'],
            },
          },
          isAdmin
            ? {
                path: '/access/admin-visible',
                handle: {
                  icon: 'EyeOutlined',
                  title: 'common.menu.adminVisible',
                },
              }
            : {
                path: '/access/common-visible',
                handle: {
                  icon: 'EyeOutlined',
                  title: 'common.menu.commonVisible',
                },
              },
        ],
      };
      return [
        homeRouter,
        accessRouter,
        demoRouter,
        aboutRouter,
        systemManagementRouter,
        outsideRouter,
        personalCenterRouter,
        routeNestRouter,
      ];
    },
  },
]);
