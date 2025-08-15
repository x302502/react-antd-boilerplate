import type { UserInfoType } from '~/api/auth/types';
import { authApi } from '~/api/auth';

import { create } from 'zustand';

const initialState = {
  id: '',
  avatar: '',
  username: '',
  email: '',
  phoneNumber: '',
  description: '',
  roles: [],
  // menus: [],
};

type UserState = UserInfoType;

interface UserAction {
  getUserInfo: () => Promise<UserInfoType>;
  reset: () => void;
}

export const useUserStore = create<UserState & UserAction>()(set => ({
  ...initialState,

  getUserInfo: async () => {
    const response = await authApi.getUserInfo();
    set({
      ...response,
    });
    return response;
  },

  reset: () => {
    return set({
      ...initialState,
    });
  },
}));
