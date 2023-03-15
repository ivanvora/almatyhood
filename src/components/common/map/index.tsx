/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, WMSTileLayer, ZoomControl } from 'react-leaflet';
import { LatLngExpression, Layer, Polyline, StyleFunction } from 'leaflet';

import { client } from '@/modules/api';
import { envs } from '@/modules/configs/app';
import { TLayer } from '@/modules/models/map';

import styles from './map.module.css';

type Props = {
    layers?: TLayer[];
};

const geoJSONStyle = () => ({
    color: '#7432FF',
    weight: 1,
    fillOpacity: 0.5,
    fillColor: '#7432FF',
    zIndex: 999,
});

const geoJSONRedLinesStyle: StyleFunction<any> = () => ({
    color: '#7432FF',
    weight: 10,
    fillOpacity: 0.5,
    fillColor: 'red',
    fill: true,
    zIndex: 902,
});

const geoJSONboundaryStyle: StyleFunction<any> = () => ({
    color: 'darkgrey',
    weight: 4,
    fillOpacity: 0,
    zIndex: 901,
});

const geoJSONDistrictsStyle: StyleFunction<any> = (f) => {
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

const GJstyles = {
    gis_red_lines: geoJSONRedLinesStyle,
    gis_districts: geoJSONDistrictsStyle,
    gis_boundary: geoJSONboundaryStyle,
};

const Map = ({ layers }: Props) => {
    const position: LatLngExpression = [43.25667, 76.92861];
    const [buildings, setBuildings] = useState<any>();

    const [backwardLayers, setBackWardLayers] = useState<{ [key in TLayer]: any }>({
        gis_boundary: null,
        gis_buildings: null,
        gis_districts: null,
        gis_red_lines: null,
    });

    useEffect(() => {
        client.map
            .getBuildings()
            .then(({ data }) => setBuildings({ ...data }))
            .catch((error) => Promise.reject(error));
        client.map
            .getBackwardLayers('gis_districts')
            .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_districts: data })))
            .catch((error) => Promise.reject(error));
        client.map
            .getBackwardLayers('gis_boundary')
            .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_boundary: data })))
            .catch((error) => Promise.reject(error));
        client.map
            .getBackwardLayers('gis_red_lines')
            .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_red_lines: data })))
            .catch((error) => Promise.reject(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const WMSProps = {
        token: 'public',
        version: '1.3',
        format: 'image/svg',
        transparent: true,
        tiles: true,
        uppercase: true,
        foo: [123, 5566],
    };

    const onEachFeature = (feature: GeoJSON.Feature<GeoJSON.Geometry, any>, layer: Layer) => {
        const popupContent = `<Popup> ${feature.properties.display_name} </Popup>`;

        layer.bindPopup(popupContent);
    };

    const drawBackwardLayers = () =>
        layers?.map((item) => {
            if (backwardLayers) {
                return (
                    <GeoJSON
                        onEachFeature={(feature, layer) => {
                            // if (layer instanceof Polyline) {
                            //     layer.setStyle({
                            //         color: 'red',
                            //         weight: 5,
                            //     });
                            // }
                        }}
                        key={item}
                        interactive={false}
                        style={GJstyles[item as keyof typeof GJstyles]}
                        data={backwardLayers[item]}
                    />
                );
            }

            return null;
        });
    const isRedLines = layers?.includes('gis_red_lines');
    const map = (
        <MapContainer
            className={styles.map}
            attributionControl={false}
            center={position}
            zoom={12}
            scrollWheelZoom={true}
            boxZoom={false}
            doubleClickZoom={false}
            zoomControl={false}
        >
            {isRedLines && (
                <WMSTileLayer
                    params={{ layers: 'gis_red_lines' }}
                    url={envs.API.GEO_SERVER_OWS}
                    {...WMSProps}
                />
            )}
            <TileLayer url={envs.API.WORLD_MAP} />
            {drawBackwardLayers()}
            {buildings ? (
                <GeoJSON onEachFeature={onEachFeature} style={geoJSONStyle} data={buildings} />
            ) : null}
            <ZoomControl position='bottomright' />
        </MapContainer>
    );

    return typeof window === 'undefined' ? null : map;
};

export default Map;
