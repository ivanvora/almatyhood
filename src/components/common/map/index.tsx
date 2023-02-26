import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, WMSTileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

import { envs } from '@/modules/configs/app';
import { TLayer } from '@/modules/models/map';

import styles from './map.module.css';

type Props = {
    markers?: LatLngExpression[];
    layers?: TLayer[];
};

const Map = ({ markers, layers }: Props) => {
    const position: LatLngExpression = [43.25667, 76.92861];

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
            scrollWheelZoom={false}
        >
            {/* <TileLayer url='http://20.92.225.31:8080/geoserver/gwc/service/tms/1.0.0{gis_red_lines}@png/{z}/{x}/{y}.png' /> */}
            <TileLayer url={envs.WORLD_MAP} />
            {layers?.map((item) => (
                <WMSTileLayer
                    key={item}
                    params={{ layers: item }}
                    url={envs.GEO_SERVER_WMS}
                    {...WMSProps}
                />
            ))}
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
        </MapContainer>
    );

    return typeof window === 'undefined' ? null : map;
};

export default Map;
