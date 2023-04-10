import { AxiosInstance, GenericAbortSignal } from 'axios';

import {
    TBuilding,
    TDistrict,
    TFilterBuildingQuery,
    TResponse,
    TStreet,
} from '@/modules/models/common';

import { AClientFacade } from '../abstract/client-facade';
import { endpoints } from '../endpoints';

export class Common extends AClientFacade {
    constructor(instance: AxiosInstance) {
        super(instance);
        this.getLikes = this.getLikes.bind(this);
    }

    filterBuildings(query: TFilterBuildingQuery, signal?: GenericAbortSignal) {
        return this.instance.get<TResponse>(endpoints.common.filterBuildings, {
            signal,
            params: query,
        });
    }

    getBuildingsInfo(query: TFilterBuildingQuery, signal?: GenericAbortSignal) {
        return this.instance.get(endpoints.common.getBuildings, { signal, params: query });
    }

    getBuildingById(id: number) {
        return this.instance.get(endpoints.common.getBuildingById(id));
    }

    getStreets(id: number) {
        return this.instance.get<TStreet[]>(endpoints.common.getStreets, { params: { id } });
    }

    getLikes(UserId: number) {
        return this.instance.get<TBuilding[]>(endpoints.common.getLikes, { params: { UserId } });
    }

    addLike(UserId: number, fid: number) {
        return this.instance.post(endpoints.common.addLike, null, {
            params: { UserId, buildingsId: fid },
        });
    }

    removeLike(UserId: number, fid: number) {
        return this.instance.delete(endpoints.common.removeLike, {
            params: { UserId, buildingsId: fid },
        });
    }

    getDistricts() {
        return this.instance.get<TDistrict[]>(endpoints.common.getDistricts);
    }
}
