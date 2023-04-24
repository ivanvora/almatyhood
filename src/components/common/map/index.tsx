/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
    GeoJSON,
    MapContainer,
    Marker,
    Popup as LPopup,
    TileLayer,
    WMSTileLayer,
    ZoomControl,
} from 'react-leaflet';
import { LatLngExpression, Layer } from 'leaflet';

import { client } from '@/modules/api';
import { envs } from '@/modules/configs/app';
import { TLayer } from '@/modules/models/map';

import { TargetPopup } from '../target-popup';

import {
    boundaryStyle,
    defaultStyle,
    districtsStyle,
    lakesStyle,
    redLinesStyle,
    riversStyle,
    seismoStyle,
} from './geojson-styles';
import Popup, { TProps as PopupProps } from './popup';

import styles from './map.module.css';

type Props = {
    layers?: TLayer[];
    featureId?: number | string;
    preload?: boolean;
};

const GJstyles = {
    gis_red_lines: redLinesStyle,
    gis_rivers: riversStyle,
    gis_lakes: lakesStyle,
    gis_seism: seismoStyle,
    gis_districts: districtsStyle,
    gis_boundary: boundaryStyle,
};

const Map = ({ layers, featureId, preload = true }: Props) => {
    const position: LatLngExpression = [43.25667, 76.92861];
    const [markerref, setMarkerRef] = useState<any>();

    const [zoom, setZoom] = useState(11);
    const [buildings, setBuildings] = useState<any>();
    const [mapRef, setMapRef] = useState<any>();
    const [buildingLayerRef, setBuildingLayerRef] = useState<any>();
    const [selectedFeature, setSelectedFeature] = useState<PopupProps>();
    const [selectedBuildingLL, setSelectedBuildingLL] = useState<LatLngExpression>();

    const [center, setCenter] = useState<LatLngExpression>(position);

    const [backwardLayers, setBackWardLayers] = useState<{ [key in TLayer]: any }>({
        gis_boundary: null,
        gis_buildings: null,
        gis_districts: null,
        gis_red_lines: null,
        gis_rivers: null,
        gis_lakes: null,
        gis_seism: null,
        gis_water_line: null,
        gis_water_zone: null,
    });

    useEffect(() => {
        if (buildings) {
            const feature = buildings.features.find(
                (item: any) => item.properties.fid === featureId,
            );

            if (feature) {
                const coordinates = [...feature.geometry.coordinates[0][0][0]];
                const newCenter = coordinates.reverse();

                setSelectedFeature({
                    district: feature.properties.district_name,
                    number: feature.properties.number,
                    street: feature.properties.street,
                    type: '',
                    year: feature.properties.year,
                    fid: feature.properties.fid,
                });

                setZoom(15);
                setCenter(newCenter as LatLngExpression);
                setSelectedBuildingLL(newCenter as LatLngExpression);
                if (mapRef) {
                    mapRef.flyTo(newCenter, 17);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [featureId]);

    useEffect(() => {
        if (markerref) {
            markerref.openPopup();
        }
    }, [markerref]);

    useEffect(() => {
        if (preload) {
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
            client.map
                .getBackwardLayers('gis_rivers')
                .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_rivers: data })))
                .catch((error) => Promise.reject(error));
            client.map
                .getBackwardLayers('gis_lakes')
                .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_lakes: data })))
                .catch((error) => Promise.reject(error));
            client.map
                .getBackwardLayers('gis_seism')
                .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_seism: data })))
                .catch((error) => Promise.reject(error));
            client.map
                .getBackwardLayers('gis_water_zone')
                .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_water_zone: data })))
                .catch((error) => Promise.reject(error));
            client.map
                .getBackwardLayers('gis_water_line')
                .then(({ data }) => setBackWardLayers((s) => ({ ...s, gis_water_line: data })))
                .catch((error) => Promise.reject(error));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const WMSProps = {
        token: 'public',
        version: '1.3',
        format: 'image/png',
        transparent: true,
        tiles: true,
        uppercase: true,
        foo: [123, 5566],
    };

    const onEachBuildingFeature = (
        feature: GeoJSON.Feature<GeoJSON.Geometry, any>,
        layer: Layer,
    ) => {
        const popupContent = `<Popup><div id='building_popup' class='${styles.building_popup}'></div> </Popup>`;

        layer.addEventListener('click', (e) => {
            setSelectedFeature({
                district: feature.properties.district_name,
                number: feature.properties.number,
                street: feature.properties.street,
                type: '',
                year: feature.properties.year,
                fid: feature.properties.fid,
            });
        });
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
            center={center}
            zoom={zoom}
            scrollWheelZoom={true}
            boxZoom={false}
            doubleClickZoom={false}
            zoomControl={false}
            ref={setMapRef}
        >
            {selectedBuildingLL ? (
                <LPopup ref={setMarkerRef} position={selectedBuildingLL}>
                    <TargetPopup {...selectedFeature} />
                </LPopup>
            ) : null}
            <Popup {...selectedFeature} />
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
                <GeoJSON
                    ref={setBuildingLayerRef}
                    onEachFeature={onEachBuildingFeature}
                    style={defaultStyle}
                    data={buildings}
                />
            ) : null}
            <ZoomControl position='bottomright' />
        </MapContainer>
    );

    return typeof window === 'undefined' ? null : map;
};

export default Map;
