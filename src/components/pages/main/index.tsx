import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Input, Select } from 'antd';

import { Bookmark } from '@/components/common/icons/bookmark';
import { Clock } from '@/components/common/icons/clock';
import { LayersButton } from '@/components/common/layers-button';
import { Top } from '@/components/common/top';
import { client } from '@/modules/api';
import { TBuilding, TDistrict } from '@/modules/models/common';
// import Map from '@/components/common/map';
import { TLayer } from '@/modules/models/map';

import styles from './main.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Main = () => {
    const [layers, setLayers] = useState<TLayer[]>();
    const [districts, setDistricts] = useState<TDistrict[]>();
    const [selectedDistrict, setSelectedDistric] = useState<number>();
    const [buildings, setBuildings] = useState<TBuilding[]>();

    const router = useRouter();

    useEffect(() => {
        client.common.getDistricts().then((res) => setDistricts(res.data));
    }, []);

    useEffect(() => {
        if (selectedDistrict) {
            client.common
                .filterBuildings({ districtId: selectedDistrict })
                .then((res) => setBuildings(res.data.gisBuildings));
        }
    }, [selectedDistrict]);

    const createDistrictsOptions = () =>
        districts?.map((item) => ({ value: item.id, label: item.disctrictName }));

    const createBuildingsOptions = () => {
        if (buildings)
            return buildings?.map((item) => ({ value: item.gid, label: item.fullNameStr }));

        return undefined;
    };

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
                <Select
                    style={{ width: '7rem' }}
                    options={createDistrictsOptions()}
                    onSelect={(e) => setSelectedDistric(e)}
                    placeholder='Район'
                />
                <Select placeholder='Улица' />
                <Select
                    showSearch={true}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    style={{ width: '15rem' }}
                    options={createBuildingsOptions()}
                    placeholder='Дом'
                />
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
