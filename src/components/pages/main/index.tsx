import React, { useEffect, useState } from 'react';
import { BarChartOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Input, Select } from 'antd';

import { Bookmark } from '@/components/common/icons/bookmark';
import { Clock } from '@/components/common/icons/clock';
import { LayersButton } from '@/components/common/layers-button';
import { Top } from '@/components/common/top';
import { client } from '@/modules/api';
import { TBuilding, TDistrict, TFilterBuildingQuery, TStreet } from '@/modules/models/common';
// import Map from '@/components/common/map';
import { TLayer } from '@/modules/models/map';

import styles from './main.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Main = () => {
    const [layers, setLayers] = useState<TLayer[]>();
    const [districts, setDistricts] = useState<TDistrict[]>();
    const [buildings, setBuildings] = useState<TBuilding[]>();
    const [selectedBuilding, setSelectedBuilding] = useState<number>();
    const [streets, setStreets] = useState<TStreet[]>();
    const [filter, setFilter] = useState<TFilterBuildingQuery>();

    const router = useRouter();

    useEffect(() => {
        client.common.getDistricts().then((res) => setDistricts(res.data));
    }, []);

    useEffect(() => {
        if (filter) {
            client.common
                .filterBuildings(filter)
                .then((res) => setBuildings(res.data.gisBuildings));
        }
    }, [filter]);

    useEffect(() => {
        if (filter?.districtId) {
            client.common
                .getStreets(filter.districtId)
                .then((res) => setStreets(res.data))
                .catch((err) => console.log(err));
        }
    }, [filter]);

    const createDistrictsOptions = () =>
        districts?.map((item) => ({ value: item.id, label: item.disctrictName }));

    const createStreetsOptions = () =>
        streets?.map((item) => ({ value: item.id, label: item.street_name }));

    const createBuildingsOptions = () => {
        if (buildings)
            return buildings?.map((item) => ({ value: item.fid, label: item.fullNameStr }));

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
        <div className={styles['top-control']}>
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
                    onSelect={(e) => setFilter((s) => ({ ...s, districtId: e }))}
                    placeholder='Район'
                />
                <Select
                    showSearch={true}
                    placeholder='Улица'
                    style={{ width: '15rem' }}
                    onSelect={(e) => setFilter((s) => ({ ...s, street: e }))}
                    options={createStreetsOptions()}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />
                <Select
                    showSearch={true}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    style={{ width: '15rem' }}
                    onSelect={(e) => setSelectedBuilding(e)}
                    options={createBuildingsOptions()}
                    placeholder='Дом'
                />
            </div>
            <Button
                icon={<BarChartOutlined />}
                style={{ marginRight: '10px' }}
                onClick={() => router.push('/metrics')}
            />
        </div>
    );

    return (
        <React.Fragment>
            <Map layers={layers} featureId={selectedBuilding} />
            <div className={styles.main}>
                <LayersButton
                    onBordersClick={() => setLayer('gis_boundary')}
                    onDistrictsClick={() => setLayer('gis_districts')}
                    onRedlinesClick={() => setLayer('gis_red_lines')}
                    onLakesClick={() => setLayer('gis_lakes')}
                    onRiversClick={() => setLayer('gis_rivers')}
                    onSeismoClick={() => setLayer('gis_seism')}
                />
                <Top>{contentTop}</Top>
            </div>
        </React.Fragment>
    );
};
