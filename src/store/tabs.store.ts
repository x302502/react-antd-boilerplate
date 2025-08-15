import type { TabPaneProps } from 'antd';
import { usePreferencesStore } from '~/store/preferences/preferences.store';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Tab item properties interface
 */
export interface TabItemProps extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
  /**
   * Whether it can be dragged
   */
  draggable?: boolean;
  /**
   * Optional history state values, such as search and hash, can be stored here
   * This state can be accessed in the target route through the useLocation hook
   * @see {@link https://reactrouter.com/en/main/hooks/use-navigate#optionsstate | usenavigate - options state}
   */
  historyState?: Record<string, any>;
}

export interface TabStateType extends Omit<TabItemProps, 'label'> {
  label: string;
}

/**
 * Initial state
 */
const initialState = {
  // Open tabs
  openTabs: new Map<string, TabStateType>([]),
  // Current active tab
  activeKey: '',
  // Whether the tab is in refresh state
  isRefresh: false,
  // Whether it is maximized
  isMaximize: false,
};

type TabsState = typeof initialState;

const { VITE_BASE_HOME_PATH } = import.meta.env;

/**
 * Tab operation interface
 */
interface TabsAction {
  setIsRefresh: (state: boolean) => void;
  addTab: (routePath: string, tabProps: TabStateType) => void;
  insertBeforeTab: (routePath: string, tabProps: TabStateType) => void;
  removeTab: (routePath: string) => void;
  closeRightTabs: (routePath: string) => void;
  closeLeftTabs: (routePath: string) => void;
  closeOtherTabs: (routePath: string) => void;
  closeAllTabs: () => void;
  setActiveKey: (routePath: string) => void;
  resetTabs: () => void;
  changeTabOrder: (from: number, to: number) => void;
  toggleMaximize: (state: boolean) => void;
}

/**
 * Tab state management
 */
export const useTabsStore = create<TabsState & TabsAction>()(
  persist(
    set => ({
      ...initialState,

      /**
       * Set whether the tab is in refresh state
       */
      setIsRefresh: (state: boolean) => {
        set({ isRefresh: state });
      },

      /**
       * 设置标签页
       */
      setActiveKey: (routePath: string) => {
        set({ activeKey: routePath });
      },

      /**
       * Insert tab at the front
       */
      insertBeforeTab: (routePath: string, tabProps: TabStateType) => {
        set(state => {
          if (routePath.length) {
            const newMap = new Map([[routePath, tabProps]]);
            for (const [key, value] of state.openTabs) {
              newMap.set(key, value);
            }
            return { openTabs: newMap };
          }
          return state;
        });
      },

      /**
       * Add tab
       */
      addTab: (routePath: string, tabProps: TabStateType) => {
        set(state => {
          if (routePath.length) {
            const newTabs = new Map(state.openTabs);
            /**
             * 1. If the tab already exists, update the historyState property, so don't deduplicate, and ...newTabs.get(routePath) is to ensure that the closable property of the home page is not overwritten
             * 2. If the tab does not exist, add it to the Map
             */
            newTabs.set(routePath, { ...newTabs.get(routePath), ...tabProps });
            return { openTabs: newTabs };
          }
          return state;
        });
      },

      /**
       * Remove tab
       */
      removeTab: (routePath: string) => {
        set(state => {
          const homePath = VITE_BASE_HOME_PATH;

          // If it's the home page, don't allow closing
          if (routePath === homePath) {
            return state;
          }

          const newTabs = new Map(state.openTabs);
          newTabs.delete(routePath);
          let newActiveKey = state.activeKey;

          // If removing the currently active tab, select the last tab
          if (routePath === state.activeKey) {
            const tabsArray = Array.from(newTabs.keys());
            newActiveKey = tabsArray.at(-1) || homePath;
          }

          // Ensure at least the home page tab is retained
          if (newTabs.size === 0) {
            newTabs.set(homePath, state.openTabs.get(homePath)!);
            newActiveKey = homePath;
          }

          return { openTabs: newTabs, activeKey: newActiveKey };
        });
      },

      /**
       * Close tabs to the right
       */
      closeRightTabs: (routePath: string) => {
        set(state => {
          const newTabs = new Map();
          let found = false;
          let activeKeyFound = false;
          let newActiveKey = state.activeKey;

          // 遍历当前所有标签页
          for (const [key, value] of state.openTabs) {
            // If the specified path is found, stop iterating
            if (found) {
              break;
            }
            // Add the current tab to the new Map
            newTabs.set(key, value);
            // If the current key equals the specified path, mark as found
            if (key === routePath) {
              found = true;
            }
            // If the current key equals the currently active tab, mark activeKey as found
            if (key === state.activeKey) {
              activeKeyFound = true;
            }
          }

          // If the currently active tab is closed, set the new active tab to the specified path
          if (!activeKeyFound) {
            newActiveKey = routePath;
          }

          // 返回更新后的状态
          return { openTabs: newTabs, activeKey: newActiveKey };
        });
      },

      /**
       * Close tabs to the left
       */
      closeLeftTabs: (routePath: string) => {
        set(state => {
          const newTabs = new Map();
          const homePath = VITE_BASE_HOME_PATH;
          let found = false;
          let newActiveKey = state.activeKey;
          let activeKeyOnRight = false;

          // First add the home page tab, because it cannot be deleted
          newTabs.set(homePath, state.openTabs.get(homePath)!);

          // 遍历当前所有标签页
          for (const [key, value] of state.openTabs) {
            if (key === homePath) continue; // Skip the home page, because it has already been added

            if (found || key === routePath) {
              newTabs.set(key, value);
              found = true;
            }

            if (key === state.activeKey && found) {
              activeKeyOnRight = true;
            }
          }

          // If the currently active tab is closed on the left, set the new active tab to the specified path
          if (!activeKeyOnRight) {
            newActiveKey = routePath;
          }

          // 返回更新后的状态
          return { openTabs: newTabs, activeKey: newActiveKey };
        });
      },

      /**
       * Close other tabs
       */
      closeOtherTabs: (routePath: string) => {
        set(state => {
          const newTabs = new Map();
          const homePath = VITE_BASE_HOME_PATH;

          // Keep the home page tab
          newTabs.set(homePath, state.openTabs.get(homePath)!);

          // Keep the specified tab
          if (routePath !== homePath && state.openTabs.has(routePath)) {
            newTabs.set(routePath, state.openTabs.get(routePath)!);
          }

          // Update the active tab
          let newActiveKey = state.activeKey;
          if (!newTabs.has(state.activeKey)) {
            newActiveKey = routePath;
          }

          return { openTabs: newTabs, activeKey: newActiveKey };
        });
      },

      /**
       * Close all tabs
       */
      closeAllTabs: () => {
        set(state => {
          const newTabs = new Map();
          const homePath = VITE_BASE_HOME_PATH;
          newTabs.set(homePath, state.openTabs.get(homePath)!);
          return { openTabs: newTabs, activeKey: homePath };
        });
      },

      /**
       * Change tab order
       */
      changeTabOrder: (from: number, to: number) => {
        set(state => {
          // You can also use import { arrayMove } from "@dnd-kit/sortable"; to swap positions
          const newTabs = Array.from(state.openTabs.entries());
          const [movedTab] = newTabs.splice(from, 1); // Directly destructure to get the moved tab
          newTabs.splice(to, 0, movedTab); // Insert at the new position

          const newOpenTabs = new Map(newTabs); // Directly use the Map constructor
          return { openTabs: newOpenTabs };
        });
      },

      /**
       * Toggle tab maximize state
       * @param {boolean} state - Maximize state
       */
      toggleMaximize: (state: boolean) => {
        set({ isMaximize: state });
      },

      /**
       * Reset tab state
       */
      resetTabs: () => {
        set(() => {
          return { ...initialState };
        });
      },
    }),
    {
      name: 'tabbar',
      /**
       * activeKey does not need persistent storage
       *
       * For example, if the page route is /home
       * Manually enter /about in the address bar
       * activeKey is still /home, causing the automatic navigation function of src/layout/layout-tabbar/index.tsx to fail
       * @see https://github.com/condorheroblog/react-antd-admin/issues/1
       */
      partialize: state => {
        return Object.fromEntries(Object.entries(state).filter(([key]) => !['activeKey'].includes(key)));
      },
      /**
       * openTabs is a Map, persistent storage needs to be managed manually
       * How do I use it with Map and Set
       * @see https://github.com/pmndrs/zustand/blob/v5.0.1/docs/integrations/persisting-store-data.md#how-do-i-use-it-with-map-and-set
       */
      storage: {
        getItem: name => {
          const str = sessionStorage.getItem(name);
          // Whether to enable persistent storage, if not enabled, return null when the page is first entered
          const isPersist = usePreferencesStore.getState().tabbarPersist;
          if (!str || !isPersist) return null;
          const existingValue = JSON.parse(str);
          return {
            ...existingValue,
            state: {
              ...existingValue.state,
              openTabs: new Map(existingValue.state.openTabs),
            },
          };
        },
        setItem: (name, newValue) => {
          // functions cannot be JSON encoded
          const str = JSON.stringify({
            ...newValue,
            state: {
              ...newValue.state,
              openTabs: Array.from(newValue.state.openTabs.entries()),
            },
          });
          sessionStorage.setItem(name, str);
        },
        removeItem: name => sessionStorage.removeItem(name),
      },
    },
  ),
);
