import { envs } from '../configs/app';

// const wmsHost = envs.GEO_SERVER_WMS;
const owsHost = envs.API.GEO_SERVER_OWS;

export const endpoints = {
    map: {
        getBuildings: owsHost,
    },
};
