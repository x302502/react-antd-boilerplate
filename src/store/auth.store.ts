import type { AuthType } from '~/api/auth/types';
import type { PasswordLoginFormType } from '~/views/@core/auth/login/components/password-login';
import { authApi } from '~/api/auth';
import { useAccessStore, useTabsStore, useUserStore } from '~/store';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  token: '',
  refreshToken: '',
};

type AuthState = AuthType;

interface AuthAction {
  login: (loginPayload: PasswordLoginFormType) => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: async loginPayload => {
        const response = await authApi.login(loginPayload);
        return set({
          ...response,
        });
      },

      logout: async () => {
        /**
         * 1. Logout
         */

        await authApi.logout();
        /**
         * 2. Clear token and other information
         */

        get().reset();
      },

      reset: () => {
        /**
         * Clear token
         */
        set({
          ...initialState,
        });
        /**
         * Clear user information
         * @see {@link https://github.com/pmndrs/zustand?tab=readme-ov-file#read-from-state-in-actions | Read from state in actions}
         */
        useUserStore.getState().reset();

        /**
         * Clear permission information
         * @see https://github.com/pmndrs/zustand?tab=readme-ov-file#readingwriting-state-and-reacting-to-changes-outside-of-components
         */
        useAccessStore.getState().reset();

        /**
         * Clear tabs
         */
        useTabsStore.getState().resetTabs();

        /**
         * Clear keepAlive cache
         * In the container-layout component, automatically refresh the keepAlive cache based on openTabs
         */
      },
    }),
    { name: 'access-token' },
  ),
);
