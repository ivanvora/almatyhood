import { AxiosInstance } from 'axios';

import { TProfile } from '@/modules/models/security';

import { AClientFacade } from '../abstract/client-facade';
import { endpoints } from '../endpoints';

export class Security extends AClientFacade {
    constructor(instance: AxiosInstance, isMock = false) {
        super(instance, isMock);
    }

    getProfile(Id: number) {
        return this.instance.get<TProfile>(endpoints.security.profile, { params: { Id } });
    }

    updateProfile(profile: TProfile) {
        return this.instance.post<TProfile>(endpoints.security.updateProfile, profile);
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
