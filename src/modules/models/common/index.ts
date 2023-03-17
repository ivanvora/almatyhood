export type TFilterBuildingQuery = {
    districtId?: number;
    startDate?: number;
    endDate?: number;
    street?: string;
    number?: number;
};

export type TBuilding = {
    gid?: number;
    fid?: number;
    displayName?: string;
    fullNameStr?: string;
    city?: string;
    street?: string;
    number?: string;
    year?: number;
    floor?: number;
    material?: string;
    pdp?: string;
    appartments?: number;
    nonLiv?: string;
    klVz?: string;
    snos?: unknown;
    snosCompany?: string;
    district_fid?: number;
    district_name?: string;
};

export type TResponse = {
    gisBuildings?: TBuilding[];
    countOfObject?: number;
    totalArea?: number;
    countOfFlat?: number;
};

export type TDistrict = {
    id: number;
    disctrictName: string;
};
