import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

export interface IHttpClientConfig extends CreateAxiosDefaults {
  beforeRequest: <TDataRequest = any>(
    config: InternalAxiosRequestConfig<TDataRequest>,
  ) => InternalAxiosRequestConfig<TDataRequest> | Promise<InternalAxiosRequestConfig<TDataRequest>>;
  handleError: (err: AxiosError<any, any>) => any;
  handleResponse: <TDataResponse = any>(response: AxiosResponse<TDataResponse>) => Promise<TDataResponse>;
}

export interface IRequestConfigBase<TDataRequest = any>
  extends Omit<AxiosRequestConfig<TDataRequest>, 'params' | 'data'> {}

export interface IRequestConfigParams<TDataRequest = any> extends IRequestConfigBase<TDataRequest> {
  params?: TDataRequest;
}

export interface IRequestConfigBody<TDataRequest = any> extends IRequestConfigBase<TDataRequest> {
  data?: TDataRequest;
}

export interface IRequestConfig<TDataRequest = any> extends IRequestConfigBase<TDataRequest> {
  data?: TDataRequest;
  params?: TDataRequest;
}

const HttpClient = (baseConfig: IHttpClientConfig) => {
  const { beforeRequest, handleError, handleResponse, ...configInit } = baseConfig;
  const initApi = () => {
    const api = axios.create(configInit);
    api.interceptors.request.use(async config => {
      return beforeRequest(config);
    });
    // api.interceptors.response.use(
    //     (response) => {
    //         return response.data
    //     },
    //     (error) => Promise.reject(error)
    // );
    return api;
  };

  const instanceApi = initApi();
  const executeApi = async <TDataResponse = any>(responsePromise: Promise<AxiosResponse<TDataResponse>>) => {
    return responsePromise
      .then(res => handleResponse(res))
      .catch((err: AxiosError) => {
        throw handleError(err);
      });
  };
  const get = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    params?: TDataRequest,
    config?: IRequestConfigBody<TDataRequest>,
  ) => {
    const newConfig = {
      ...(config || {}),
      params,
    };
    return executeApi<TDataResponse>(instanceApi.get(endPoint, newConfig));
  };
  const post = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    body?: TDataRequest,
    config?: IRequestConfigParams<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.post(endPoint, body, config));
  };
  const put = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    body?: TDataRequest,
    config?: IRequestConfigParams<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.put(endPoint, body, config));
  };
  const patch = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    body?: TDataRequest,
    config?: IRequestConfigParams<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.patch(endPoint, body, config));
  };
  const deleteMethod = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    config?: IRequestConfig<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.delete(endPoint, config));
  };

  const postForm = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    body?: TDataRequest,
    config?: IRequestConfigParams<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.postForm(endPoint, body, config));
  };
  const putForm = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    body?: TDataRequest,
    config?: IRequestConfigParams<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.putForm(endPoint, body, config));
  };
  const patchForm = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    body?: TDataRequest,
    config?: IRequestConfigParams<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.patchForm(endPoint, body, config));
  };

  const request = <TDataResponse = any, TDataRequest = any>(config: IRequestConfig<TDataRequest>) => {
    return executeApi<TDataResponse>(instanceApi.request(config));
  };

  const head = <TDataResponse = any, TDataRequest = any>(endPoint: string, config?: IRequestConfig<TDataRequest>) => {
    return executeApi<TDataResponse>(instanceApi.head(endPoint, config));
  };
  const options = <TDataResponse = any, TDataRequest = any>(
    endPoint: string,
    config?: IRequestConfig<TDataRequest>,
  ) => {
    return executeApi<TDataResponse>(instanceApi.options(endPoint, config));
  };

  const getUri = (config?: AxiosRequestConfig) => instanceApi.getUri(config);

  return {
    get,
    post,
    put,
    patch,
    delete: deleteMethod,
    //
    postForm,
    putForm,
    patchForm,
    //
    getUri,
    request,
    head,
    options,
  };
};

export const createHttpClient = (baseConfig: IHttpClientConfig) => HttpClient(baseConfig);
