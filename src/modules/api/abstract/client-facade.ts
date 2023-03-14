import { AxiosInstance } from 'axios';

export abstract class AClientFacade {
    instance: AxiosInstance;

    isMock: boolean;

    constructor(instance: AxiosInstance, isMock = false) {
        this.instance = instance;
        this.isMock = isMock;
    }
}
