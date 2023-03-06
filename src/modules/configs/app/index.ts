export const envs = {
    GEO_SERVER_WMS:
        process.env.NEXT_PUBLIC_GEO_SERVER_WMS ?? 'http://20.92.225.31:8080/geoserver/ne/wms?',
    GEO_SERVER_OWS:
        process.env.NEXT_PUBLIC_GEO_SERVER_WMS ?? 'http://20.92.225.31:8080/geoserver/ows?',
    WORLD_MAP:
        process.env.NEXT_PUBLIC_WORLD_MAP ?? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
};
