export type TLayer = 'gis_boundary' | 'gis_districts' | 'gis_red_lines' | 'gis_buildings';

export type TBuildinFeature = {
    type: string;
    id: string;
    geometry: {
        type: string;
        coordinates: any;
    };
    geometry_name: string;
    properties: {
        fid?: string;
        display_name?: string;
        full_name_str?: string;
        city?: string;
        street?: string;
        number?: string;
        year?: number;
        floor?: number;
        material?: string;
        pdp?: string;
        appartments?: number;
        non_liv?: string;
        kl_vz?: string;
        snos?: string;
        snos_company?: string;
        district_fid?: number;
        district_name?: string;
    };
};
