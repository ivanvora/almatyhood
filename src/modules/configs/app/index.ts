import { DEFAULT_ENVS } from './default';

export const envs = {
    API: {
        GEO_SERVER_WMS:
            process.env.NEXT_PUBLIC_API_GEO_SERVER_WMS ?? DEFAULT_ENVS.API.GEO_SERVER_WMS,
        GEO_SERVER_OWS:
            process.env.NEXT_PUBLIC_API_GEO_SERVER_OWS ?? DEFAULT_ENVS.API.GEO_SERVER_OWS,
        WORLD_MAP: process.env.NEXT_PUBLIC_API_WORLD_MAP ?? DEFAULT_ENVS.API.WORLD_MAP,
        MOCK: process.env.NEXT_PUBLIC_API_MOCK ?? DEFAULT_ENVS.API.MOCK,
        TIMEOUT: process.env.NEXT_PUBLIC_API_TIMEOUT ?? DEFAULT_ENVS.API.TIMEOUT,
    },
};
