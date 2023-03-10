import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Input, Select } from 'antd';

import { Bookmark } from '@/components/common/icons/bookmark';
import { Clock } from '@/components/common/icons/clock';
import { LayersButton } from '@/components/common/layers-button';
import { Top } from '@/components/common/top';
// import Map from '@/components/common/map';
import { TLayer } from '@/modules/models/map';

import styles from './main.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Main = () => {
    const [layers, setLayers] = useState<TLayer[]>();
    const router = useRouter();

    const setLayer = (layer: TLayer) => {
        setLayers((state) => {
            if (state === undefined) return [layer];

            if (state.find((item) => item === layer)) {
                return [...state.filter((item) => item !== layer)];
            }

            return [...state, layer];
        });
    };

    const contentTop = (
        <React.Fragment>
            <div className={styles['search-block']}>
                <Button className={styles.bookmark}>
                    <Bookmark />
                </Button>
                <Button className={styles.clock}>
                    <Clock />
                </Button>
                <Input
                    style={{ width: '300px', height: '30px' }}
                    type='primary'
                    placeholder='Текст...'
                />
            </div>
            <div className={styles['select-block']}>
                <Select placeholder='Район' />
                <Select placeholder='Улица' />
                <Select placeholder='Дом' />
            </div>
            <Button style={{ marginRight: '50px' }} onClick={() => router.push('/metrics')}>
                Метрики
            </Button>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Map layers={layers} />
            <div className={styles.main}>
                <LayersButton
                    onBordersClick={() => setLayer('gis_boundary')}
                    onDistrictsClick={() => setLayer('gis_districts')}
                    onRedlinesClick={() => setLayer('gis_red_lines')}
                />
                <Top>{contentTop}</Top>
            </div>
        </React.Fragment>
    );
};
