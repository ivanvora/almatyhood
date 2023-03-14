import axios, { AxiosInstance } from 'axios';

import { envs } from '../configs/app';

import { Common } from './common';
import { Map } from './map';

class Client {
    constructor(instance: AxiosInstance) {
        const isMock = envs.API.MOCK === '1';

        this.map = new Map(instance, isMock);
        this.common = new Common(instance, isMock);
    }

    common: Common;

    map: Map;
}

const instance = axios.create({
    timeout: +envs.API.TIMEOUT,
});

export const client = new Client(instance);
