import { envs } from '../configs/app';

// const wmsHost = envs.GEO_SERVER_WMS;
const owsHost = envs.API.GEO_SERVER_OWS;
const commonHost = envs.API.COMMON;
const securityHost = envs.API.COMMON;

export const endpoints = {
    map: {
        getBuildings: owsHost,
    },
    common: {
        filterBuildings: `${commonHost}/GetBuildingsSorted`,
        getBuildings: `${commonHost}/GisBuilding`,
        getDistricts: `${commonHost}/GisGisDistricts`,
        getStreets: `${commonHost}/GisStreets`,
        getBuildingById: (id: number) => `${commonHost}/GisBuildingById?Id=${id}`,
        getLikes: `${commonHost}/GetLikes`,
        addLike: `${commonHost}/InsertLikes`,
        removeLike: `${commonHost}/DeleteLike`,
        getBuildingByKadastr: `${commonHost}/GetBuildingsByKadastrov`,
        search: `${commonHost}/GetBuildingsByStreetName`,
    },
    security: {
        login: `${securityHost}/PostLoginDetails`,
        profile: `${securityHost}/GetUserInfo`,
        updateProfile: `${securityHost}/UpdateUserInfo`,
    },
};
