import { AxiosInstance, AxiosResponse } from 'axios';

import { TLayer } from '@/modules/models/map';
import { promisify } from '@/modules/utils';

import { AClientFacade } from '../abstract/client-facade';
import { endpoints } from '../endpoints';

import { buildings, districts } from './mocks';

export class Map extends AClientFacade {
    constructor(instance: AxiosInstance, isMock = false) {
        super(instance, isMock);
    }

    DEFAULT_PARAMS = {
        outputFormat: 'application/json',
        maxFeatures: 50000,
        request: 'GetFeature',
        service: 'WFS',
        version: '2.0.0',
    };

    getBuildings() {
        if (this.isMock) {
            return promisify(buildings) as Promise<AxiosResponse<any>>;
        }

        return this.instance.get(endpoints.map.getBuildings, {
            params: {
                ...this.DEFAULT_PARAMS,
                typeName: 'ne:gis_buildings',
            },
        });
    }

    getBackwardLayers(layer: TLayer) {
        if (this.isMock) {
            return promisify(districts) as Promise<AxiosResponse<any>>;
        }

        return this.instance.get(endpoints.map.getBuildings, {
            params: {
                ...this.DEFAULT_PARAMS,
                typeName: `ne:${layer}`,
            },
        });
    }
}
