import { AxiosError, InternalAxiosRequestConfig } from 'axios';
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
