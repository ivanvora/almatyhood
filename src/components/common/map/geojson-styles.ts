import { StyleFunction } from 'leaflet';

export const defaultStyle = () => ({
    color: '#7432FF',
    weight: 1,
    fillOpacity: 0.5,
    fillColor: '#7432FF',
    zIndex: 999,
});

export const redLinesStyle: StyleFunction<any> = () => ({
    color: 'red',
    weight: 1,
    fillOpacity: 0.5,
    fillColor: 'none',
    fill: true,
    zIndex: 902,
});

export const riversStyle: StyleFunction<any> = () => ({
    color: 'blue',
    weight: 1,
    fillOpacity: 0.5,
    fillColor: 'none',
    fill: true,
    zIndex: 902,
});

export const lakesStyle: StyleFunction<any> = () => ({
    color: 'blue',
    weight: 1,
    fillOpacity: 0.5,
    fillColor: 'none',
    fill: true,
    zIndex: 902,
});

export const boundaryStyle: StyleFunction<any> = () => ({
    color: 'darkgrey',
    weight: 4,
    fillOpacity: 0,
    zIndex: 901,
});

export const districtsStyle: StyleFunction<any> = (f) => {
    const districtsColors = {
        'gis_districts.1': 'yellow',
        'gis_districts.2': 'green',
        'gis_districts.3': 'cadetblue',
        'gis_districts.4': 'cyan',
        'gis_districts.5': 'aquamarine',
        'gis_districts.6': 'coral',
        'gis_districts.7': 'gold',
        'gis_districts.8': '#32ff58',
    };

    return {
        color: f ? districtsColors[f.id as keyof typeof districtsColors] : 'grey',
        weight: 2,
        fillOpacity: 0.2,
        fillColor: f ? districtsColors[f.id as keyof typeof districtsColors] : 'grey',
        zIndex: 900,
    };
};
export const seismoStyle: StyleFunction<any> = (f) => {
    const zoneColors = {
        '9 баллов': 'green',
        '9 или 10 баллов до уточнения проекта': 'yellow',
        '10 баллов': 'red',
        'Тектонический разлом': 'black',
    };

    return {
        color: f ? zoneColors[f.properties.type as keyof typeof zoneColors] : 'grey',
        weight: 1,
        fillOpacity: 0.2,
        fillColor: f ? zoneColors[f.properties.type as keyof typeof zoneColors] : 'grey',
        zIndex: 900,
    };
};
