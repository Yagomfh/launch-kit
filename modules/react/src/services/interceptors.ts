import {
  AxiosDefaults,
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  createSessionCookies,
  getRefreshToken,
  getToken,
  removeSessionCookies,
} from '../utils';
import toast from 'react-hot-toast';

type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

let isRefreshing = false;
let failedRequestQueue: FailedRequestQueue[] = [];

type SetAuthorizationHeaderParams = {
  request: AxiosDefaults | AxiosRequestConfig;
  token: string;
};

export function setAuthorizationHeader(params: SetAuthorizationHeaderParams) {
  const { request, token } = params;

  (request.headers as Record<string, unknown>)[
    'Authorization'
  ] = `Bearer ${token}`;
}

export function removeAuthorizationHeader(api: AxiosInstance) {
  delete api.defaults.headers.Authorization;
}

function handleRefreshToken(api: AxiosInstance, refreshToken: string) {
  isRefreshing = true;

  api
    .post(
      '/refresh',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((response) => {
      const { token } = response.data;

      createSessionCookies({ token, refreshToken: response.data.refreshToken });
      setAuthorizationHeader({ request: api.defaults, token });

      failedRequestQueue.forEach((request) => request.onSuccess(token));
      failedRequestQueue = [];
    })
    .catch((error) => {
      failedRequestQueue.forEach((request) => request.onFailure(error));
      failedRequestQueue = [];

      removeSessionCookies();
    })
    .finally(() => {
      isRefreshing = false;
    });
}

function onRequest(config: AxiosRequestConfig) {
  const token = getToken();

  if (token) {
    setAuthorizationHeader({ request: config, token });
  }

  return config as InternalAxiosRequestConfig;
}

function onRequestError(error: AxiosError): Promise<AxiosError> {
  return Promise.reject(error);
}

function onResponse(response: AxiosResponse): AxiosResponse {
  return response;
}

type ErrorCode = {
  code: string;
};

function onResponseError(
  api: AxiosInstance,
  error: AxiosError<ErrorCode>
): Promise<AxiosError | AxiosResponse> {
  if (error?.response?.status === 401) {
    if (error.response?.data?.code === 'token.expired') {
      const originalConfig = error.config as AxiosRequestConfig;
      const refreshToken = getRefreshToken();

      if (!isRefreshing) {
        handleRefreshToken(api, refreshToken);
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            setAuthorizationHeader({ request: originalConfig, token });
            resolve(api(originalConfig));
          },
          onFailure: (error: AxiosError) => {
            reject(error);
          },
        });
      });
    } else {
      removeSessionCookies();
    }
  }

  console.log('error', error);

  toast.error(
    (error.response?.data as any)?.error?.message || 'An error occurred'
  );

  return Promise.reject(error);
}

export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, (error) =>
    onResponseError(axiosInstance, error)
  );

  return axiosInstance;
}
