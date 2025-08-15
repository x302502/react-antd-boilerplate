import { createHttpClient } from '~/@core/network';
import { commonHelper } from '~/common/helpers/common.helper';
import { useAuthStore, usePreferencesStore } from '~/store';
import { AUTH_HEADER, LANG_HEADER } from '~/utils/request/constants';

export const optionalApiConnector = createHttpClient({
  baseURL: '',
  timeout: 2 * 60 * 1000,
  beforeRequest: config => {
    return config;
  },
  handleError: err => {
    return err;
  },
  handleResponse: async res => {
    return res.data;
  },
});

export const fakeApiConnector = createHttpClient({
  baseURL: commonHelper.getBaseUrl(),
  timeout: 2 * 60 * 1000,
  beforeRequest: config => {
    const { token } = useAuthStore.getState();
    config.headers.set(AUTH_HEADER, `Bearer ${token}`);
    // Language needs to be carried by all API interfaces
    config.headers.set(LANG_HEADER, usePreferencesStore.getState().language);
    return config;
  },
  handleError: err => {
    return err;
  },
  handleResponse: async res => {
    return res.data;
  },
});
