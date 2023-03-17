import { envs } from '../configs/app';

// const wmsHost = envs.GEO_SERVER_WMS;
const owsHost = envs.API.GEO_SERVER_OWS;
const commonHost = envs.API.COMMON;

export const endpoints = {
    map: {
        getBuildings: owsHost,
    },
    common: {
        filterBuildings: `${commonHost}/GetBuildingsSorted`,
        getBuildings: `${commonHost}/GisBuilding`,
        getDistricts: `${commonHost}/GisGisDistricts`,
        getBuildingById: (id: number) => `${commonHost}/GisBuildingById?Id=${id}`,
    },
};
