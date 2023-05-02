/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BarChartOutlined, CloudOutlined, HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Select, SelectProps } from 'antd';

import { HouseOption } from '@/components/common/house-option';
import { HouseSelector } from '@/components/common/house-selector';
import { LayersButton } from '@/components/common/layers-button';
import { Top } from '@/components/common/top';
import { client } from '@/modules/api';
import { useAxiosErrorHandle, useSearch } from '@/modules/hooks';
import { TBuilding, TDistrict, TFilterBuildingQuery, TStreet } from '@/modules/models/common';
// import Map from '@/components/common/map';
import { TLayer } from '@/modules/models/map';
import { GET_LIKES } from '@/modules/redux/actions';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks';

import styles from './main.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Main = () => {
    const dispatch = useAppDispatch();

    const [layers, setLayers] = useState<TLayer[]>();
    const [districts, setDistricts] = useState<TDistrict[]>();
    const [buildings, setBuildings] = useState<TBuilding[]>();
    const [isBuildingsLoading, setIsBuildingsLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchOptions, setSearchOptions] = useState<SelectProps<object>['options']>([]);
    const [searchSelected, setSearchSelected] = useState<any>();
    const [isSateliteMap, setIsSateligteMap] = useState(false);

    const [selectedBuilding, setSelectedBuilding] = useState<number>();
    const [streets, setStreets] = useState<TStreet[]>();
    const [isStreetsLoading, setIsStreetsLoading] = useState(false);

    const [filter, setFilter] = useState<TFilterBuildingQuery>();
    const axiosErrorHandler = useAxiosErrorHandle();

    const router = useRouter();
    const { isLoading: isloadingLikes, likes } = useAppSelector((s) => s.likesReducer);

    const { data, isLoading } = useSearch(searchText);

    useEffect(() => {
        if (searchSelected) {
            setSelectedBuilding(searchSelected);
        }
    }, [searchSelected]);

    useEffect(() => {
        setSearchOptions(
            data?.map((item) => ({
                label: item.fullNameStr,
                value: item.fid,
            })),
        );
    }, [data]);

    useEffect(() => {
        client.common
            .getDistricts()
            .then((res) => setDistricts(res.data))
            .catch((err) => axiosErrorHandler(err));
        const userid = Cookies.get('userId');

        if (userid) dispatch(GET_LIKES(+userid));
    }, []);

    useEffect(() => {
        if (filter && filter.street) {
            setIsBuildingsLoading(true);
            client.common
                .filterBuildings(filter)
                .then((res) => {
                    setBuildings(res.data.gisBuildings);
                    setIsBuildingsLoading(false);
                })
                .catch((err) => {
                    axiosErrorHandler(err);
                    setIsBuildingsLoading(false);
                });
        }
    }, [filter?.street]);

    useEffect(() => {
        if (filter?.districtId) {
            setIsStreetsLoading(true);
            client.common
                .getStreets(filter.districtId)
                .then((res) => {
                    setStreets(res.data);
                    setIsStreetsLoading(false);
                })
                .catch((err) => {
                    axiosErrorHandler(err);
                    setIsStreetsLoading(false);
                });
        }
    }, [filter?.districtId]);

    const createDistrictsOptions = () =>
        districts?.map((item) => ({ value: item.id, label: item.disctrictName }));

    const createStreetsOptions = () =>
        streets?.map((item) => ({ value: item.id, label: item.street_name }));

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
                <HouseSelector
                    hideText={true}
                    isLoading={isloadingLikes}
                    buttonIcon={<HeartOutlined />}
                    onSelectedItem={(v) => setSelectedBuilding(+v)}
                    placeholder={undefined}
                    options={likes?.map((i) => ({
                        selectOption: <HouseOption building={i} />,
                        label: i.fullNameStr ?? '',
                        value: i.fid ? i.fid.toString(10) : '',
                    }))}
                />
                <Select
                    showSearch={true}
                    showArrow={false}
                    onSearch={(v) => setSearchText(v)}
                    value={searchSelected}
                    onChange={(v) => setSearchSelected(v)}
                    options={searchOptions}
                    filterOption={false}
                    notFoundContent={isLoading ? <LoadingOutlined /> : null}
                    style={{ width: '300px', height: '30px' }}
                    placeholder='Текст...'
                />
            </div>
            <div className={styles['select-block']}>
                <Select
                    style={{ width: '7rem' }}
                    options={createDistrictsOptions()}
                    onSelect={(e) => {
                        setFilter((s) => ({
                            ...s,
                            districtId: e,
                            street: undefined,
                        }));
                        setSelectedBuilding(undefined);
                    }}
                    placeholder='Район'
                />
                <Select
                    disabled={!filter?.districtId || isStreetsLoading}
                    showSearch={true}
                    suffixIcon={isStreetsLoading ? <LoadingOutlined /> : null}
                    value={filter?.street}
                    placeholder='Улица'
                    style={{ width: '15rem' }}
                    onSelect={(e) => {
                        setFilter((s) => ({ ...s, street: e }));
                        setSelectedBuilding(undefined);
                    }}
                    options={createStreetsOptions()}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                />
                <HouseSelector
                    disbled={!filter?.street}
                    isLoading={isBuildingsLoading}
                    placeholder='Дом'
                    value={selectedBuilding?.toString()}
                    onSelectedItem={(v) => setSelectedBuilding(+v)}
                    options={buildings?.map((i) => ({
                        selectOption: <HouseOption building={i} />,
                        label: i.fullNameStr ?? '',
                        value: i.fid ? i.fid.toString(10) : '',
                    }))}
                />
            </div>
            <div>
                <Button icon={<BarChartOutlined />} onClick={() => router.push('/metrics')} />
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <Map isSatelite={isSateliteMap} layers={layers} featureId={selectedBuilding} />
            <div className={styles['left-controll-panel']}>
                <Button icon={<CloudOutlined />} onClick={() => setIsSateligteMap((s) => !s)} />
            </div>
            <div className={styles.main}>
                <LayersButton
                    onBordersClick={() => setLayer('gis_boundary')}
                    onDistrictsClick={() => setLayer('gis_districts')}
                    onRedlinesClick={() => setLayer('gis_red_lines')}
                    onLakesClick={() => setLayer('gis_lakes')}
                    onRiversClick={() => setLayer('gis_rivers')}
                    onSeismoClick={() => setLayer('gis_seism')}
                    onWaterGuardZoneClick={() => setLayer('gis_water_zone')}
                    onWaterGuardStripClick={() => setLayer('gis_water_line')}
                />
                <Top>{contentTop}</Top>
            </div>
        </React.Fragment>
    );
};
