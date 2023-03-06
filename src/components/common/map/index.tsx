/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    GeoJSON,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
    WMSTileLayer,
    ZoomControl,
} from 'react-leaflet';
import axios from 'axios';
import { LatLngExpression } from 'leaflet';

import { envs } from '@/modules/configs/app';
import { TLayer } from '@/modules/models/map';

import styles from './map.module.css';

type Props = {
    markers?: LatLngExpression[];
    layers?: TLayer[];
};

function MyComponent() {
    const map = useMapEvents({
        click: () => {
            map.locate();
        },
        locationfound: (location) => {
            console.log('location found:', location);
        },
    });

    return null;
}
const Map = ({ markers, layers }: Props) => {
    const position: LatLngExpression = [43.25667, 76.92861];
    const [buildings, setBuildings] = useState<any>();

    const GEOSERVER = 'http://20.92.225.31:8080/geoserver/ne/ows';

    const REQUEST_PARAMS = {
        outputFormat: 'application/json',
        maxFeatures: 50,
        request: 'GetFeature',
        service: 'WFS',
        typeName: 'ne:gis_buildings',
        version: '1.0.0',
    };

    useEffect(() => {
        axios
            .get(GEOSERVER, { params: REQUEST_PARAMS })
            .then(({ data }) => setBuildings({ data }))
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
            {/* <TileLayer url='http://20.92.225.31:8080/geoserver/gwc/service/tms/1.0.0{gis_red_lines}@png/{z}/{x}/{y}.png' /> */}
            <TileLayer url={envs.WORLD_MAP} />
            {layers?.map((item) => (
                <WMSTileLayer
                    className={styles[item]}
                    key={item}
                    params={{ layers: item }}
                    url={envs.GEO_SERVER_WMS}
                    {...WMSProps}
                />
            ))}
            {buildings ? <GeoJSON data={buildings} /> : null}
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup.
                    <br />
                    Easily customizable.
                </Popup>
            </Marker>
            {markers?.map((item) => (
                <Marker position={item}>{item.toString()}</Marker>
            ))}
            <MyComponent />
            <ZoomControl position='bottomright' />
        </MapContainer>
    );

    return typeof window === 'undefined' ? null : map;
};

export default Map;
