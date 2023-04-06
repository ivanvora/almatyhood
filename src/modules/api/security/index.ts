import { AxiosInstance } from 'axios';
import { AClientFacade } from '../abstract/client-facade';
import { endpoints } from '../endpoints';

export class Security extends AClientFacade {
    constructor(instance: AxiosInstance, isMock = false) {
        super(instance, isMock);
    }

    login(login: string, password: string) {
        return this.instance.post<{ accessToken: string; id: string }>(
            endpoints.security.login,
            null,
            {
                params: { login, password },
            },
        );
    }
}
