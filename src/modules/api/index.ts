import axios, { AxiosInstance } from 'axios';

import { envs } from '../configs/app';

import { authInterceptorPair } from './security/interceptor';
import { Common } from './common';
import { Map } from './map';
import { Security } from './security';

class Client {
    constructor(instance: AxiosInstance) {
        const isMock = envs.API.MOCK === '1';

        this.map = new Map(instance, isMock);
        this.common = new Common(instance);
        this.security = new Security(instance, isMock);
    }

    common: Common;

    map: Map;

    security: Security;
}

const instance = axios.create({
    timeout: +envs.API.TIMEOUT,
});

const configInstance = (i: AxiosInstance) => {
    i.interceptors.request.use(authInterceptorPair.onFulfiled, authInterceptorPair.onReject);

    return i;
};

export const client = new Client(configInstance(instance));
