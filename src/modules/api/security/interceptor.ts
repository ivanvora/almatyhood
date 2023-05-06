import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

export const authInterceptorPair = {
    onFulfiled(config: InternalAxiosRequestConfig) {
        // Здесь можете сделать что-нибудь с перед отправкой запроса
        const accessToken = Cookies.get('accessToken');

        if (config && config.headers && accessToken) {
            config.headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return config;
    },
    onReject(error: AxiosError) {
        // Сделайте что-нибудь с ошибкой запроса
        console.log('error', error);
        return Promise.reject(error);
    },
};

export const errorHandlingInterceptors = {
    onFulfiled(response: AxiosResponse) {
        // Здесь можете сделать что-нибудь с перед отправкой запроса
        // console.log('resp', response);
        if (response.status === 401) {
            window.location.href = '/error/401';
        }

        return response;
    },
    onReject(error: AxiosError) {
        // Сделайте что-нибудь с ошибкой запроса
        if (error?.response?.status === 401) {
            window.location.href = '/error/401';
        }
        console.log('error resp', error);
        return Promise.reject(error);
    },
};
