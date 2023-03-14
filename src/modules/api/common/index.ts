import { GenericAbortSignal } from 'axios';

import { TFilterBuildingQuery } from '@/modules/models/common';

import { AClientFacade } from '../abstract/client-facade';
import { endpoints } from '../endpoints';

export class Common extends AClientFacade {
    filterBuildings(query: TFilterBuildingQuery, signal?: GenericAbortSignal) {
        return this.instance.get(endpoints.common.filterBuildings, { signal, params: query });
    }

    getCommonInfo(query: TFilterBuildingQuery, signal?: GenericAbortSignal) {
        return this.instance.get(endpoints.common.getCommonInfo, { signal, params: query });
    }

    getBuildingById(id: number) {
        return this.instance.get(endpoints.common.getBuildingById(id));
    }
}
