import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import { LayersButton } from '@/components/common/layers-button';
import { Top } from '@/components/common/top';
// import Map from '@/components/common/map';
import { TLayer } from '@/modules/models/map';

import styles from './main.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Main = () => {
    const [layers, setLayers] = useState<TLayer[]>();

    const setLayer = (layer: TLayer) => {
        setLayers((state) => {
            if (state === undefined) return [layer];

            if (state.find((item) => item === layer)) {
                return [...state.filter((item) => item !== layer)];
            }

            return [...state, layer];
        });
    };

    return (
        <React.Fragment>
            <Map layers={layers} />
            <div className={styles.main}>
                <LayersButton
                    onBordersClick={() => setLayer('gis_boundary')}
                    onDistrictsClick={() => setLayer('gis_districts')}
                    onRedlinesClick={() => setLayer('gis_red_lines')}
                />
                <Top />
            </div>
        </React.Fragment>
    );
};
