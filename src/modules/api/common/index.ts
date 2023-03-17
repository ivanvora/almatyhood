import { GenericAbortSignal } from 'axios';

import { TDistrict, TFilterBuildingQuery, TResponse } from '@/modules/models/common';

import { AClientFacade } from '../abstract/client-facade';
import { endpoints } from '../endpoints';

export class Common extends AClientFacade {
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

    getDistricts() {
        return this.instance.get<TDistrict[]>(endpoints.common.getDistricts);
    }
}
