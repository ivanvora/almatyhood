export const DEFAULT_ENVS = {
    API: {
        GEO_SERVER_WMS: 'http://20.92.225.31:8080/geoserver/ne/wms?',
        GEO_SERVER_OWS: 'http://20.92.225.31:8080/geoserver/ne/ows?',
        WORLD_MAP: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        WORLD_SATELITE_MAP: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        COMMON: 'https://dilapidatehousing.azurewebsites.net',
        MOCK: '0',
        TIMEOUT: '30000',
    },
};
