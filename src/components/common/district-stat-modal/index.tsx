/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { GlobalOutlined, RightOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { Button, Collapse, Input, Select, Slider, Typography } from 'antd';

import { client } from '@/modules/api';
import { DISTRICTS_MAP } from '@/modules/dictionary';
import {
    useAxiosErrorHandle,
    useFilterBuildings,
    useGetBuildingsByKadastr,
    useGetCommonInfo,
} from '@/modules/hooks';
import { TBuilding, TFilterBuildingQuery, TStreet } from '@/modules/models/common';

import { ContentWrapper } from '../content-wrapper';
import { MapScheme } from '../icons/map-scheme';
import Legend from '../legend';
import { Plate } from '../plate';
import { Top } from '../top';

import { HomeStat } from './home-stat';
import { StatProgress } from './stat-progress';
import { StatRow } from './stat-row';

import styles from './district-stat-modal.module.css';

const { Panel } = Collapse;

type TDistrict = keyof typeof DISTRICTS_MAP;

const STARTDATEF = 1900;
const ENDDATEF = 1999;

export const DistrictStat = () => {
    const router = useRouter();

    const [filter, setFilter] = useState<TFilterBuildingQuery>({});
    const [filterCommon, setFilterCommon] = useState<TFilterBuildingQuery>({});
    const [periodFilter, setPeriodFilter] = useState([STARTDATEF, ENDDATEF]);
    const [districtName, setDistrictName] = useState('');
    const [selectedBuilding, setSelectedBuilding] = useState<number>();
    const [currentBuilding, setCurrentBuilding] = useState<TBuilding>();
    const [streets, setStreets] = useState<TStreet[]>();
    const [kadastr, setKadastr] = useState('');
    const [currentFilter, setCurrentFilter] = useState<'kadastr' | 'main'>();

    const axiosErrorHandler = useAxiosErrorHandle();

    useEffect(() => {
        if (filterCommon.startDate) {
            setPeriodFilter((s) => [filterCommon.startDate ?? STARTDATEF, s[1]]);
        }
        if (filterCommon.endDate) {
            setPeriodFilter((s) => [s[0], filterCommon.endDate ?? ENDDATEF]);
        }
    }, [filterCommon]);

    useEffect(() => {
        setCurrentFilter('main');
        if (filter.districtId) {
            client.common
                .getStreets(filter.districtId)
                .then((res) => setStreets(res.data))
                .catch((err) => axiosErrorHandler(err));
        }
    }, [filter]);

    useEffect(() => {
        if (selectedBuilding) {
            client.common
                .getBuildingById(selectedBuilding)
                .then((res) => setCurrentBuilding(res.data[0]))
                .catch((err) => axiosErrorHandler(err));
        }
    }, [selectedBuilding]);

    useEffect(() => {
        setCurrentFilter('kadastr');
    }, [kadastr]);

    const { data } = useFilterBuildings(filter);

    const { data: commonData } = useGetCommonInfo(filterCommon);

    const { data: kadastrData } = useGetBuildingsByKadastr(kadastr);

    const getDistrictMap = (key: TDistrict) => DISTRICTS_MAP[key];

    const createSelectOptions = () => {
        if (data && data.gisBuildings && filter.districtId && currentFilter === 'main') {
            return data?.gisBuildings?.map((item) => ({
                value: item.fid,
                label: item.fullNameStr,
            }));
        }

        if (kadastrData && currentFilter === 'kadastr') {
            return kadastrData?.map((item) => ({
                value: item.fid,
                label: item.fullNameStr,
            }));
        }

        return undefined;
    };

    const createStreetsOptions = () =>
        streets?.map((item) => ({ value: item.id, label: item.street_name }));

    const disableBuildingSelect = () => {
        if (currentFilter === 'kadastr') return false;
        if (currentFilter === 'main' && filter?.street) return false;

        return true;
    };

    return (
        <ContentWrapper>
            <Top>
                <div className={styles['top-control']}>
                    <Button icon={<GlobalOutlined />} onClick={() => router.push('/main')} />
                </div>
            </Top>
            <div className={styles.body}>
                <div className={styles['map-stats']}>
                    <Plate>
                        <div className={styles.districts}>
                            <div className={styles['common-stats']}>
                                <Legend bigTitle={true} title='Период постройки'>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginTop: '10px',
                                        }}
                                    >
                                        <Legend bigTitle={true} title={`${STARTDATEF} год`} />
                                        <Legend bigTitle={true} title={`${ENDDATEF} год`} />
                                    </div>
                                    <Slider
                                        style={{ width: '250px', zIndex: 9999 }}
                                        range={true}
                                        min={STARTDATEF}
                                        max={ENDDATEF}
                                        onAfterChange={(val) =>
                                            setFilterCommon((s) => ({
                                                ...s,
                                                startDate: val[0],
                                                endDate: val[1],
                                            }))
                                        }
                                    />
                                </Legend>
                                <StatRow
                                    data={
                                        commonData?.countOfObject ? commonData?.countOfObject : ''
                                    }
                                    title='Кол-во объектов'
                                />
                                <StatRow
                                    data={`${commonData?.totalArea ?? 0} м2`}
                                    title='Общая площадь'
                                />
                                <StatRow
                                    data={commonData?.countOfFlat ? commonData?.countOfFlat : ''}
                                    title='Кол-во квартир'
                                />
                                <StatRow data='' title='Жилые' />
                                <StatRow data='' title='Коммерческие' />
                                <StatRow data='' title='Муниципальные' />
                            </div>
                            <MapScheme
                                onClick={(d) => {
                                    setFilter(() => ({
                                        districtId: getDistrictMap(d as TDistrict).id,
                                    }));
                                    setSelectedBuilding(undefined);
                                    setDistrictName(getDistrictMap(d as TDistrict).name);
                                }}
                                className={styles.map}
                                selectMany={false}
                            />
                        </div>
                    </Plate>
                </div>
                <div className={styles.stats}>
                    {districtName && (
                        <Plate className={styles['right-plate']}>
                            <Typography.Title style={{ margin: '0', fontSize: '1.5rem' }}>
                                {districtName}
                            </Typography.Title>
                            <div className={styles['district-filter']}>
                                <Plate
                                    style={{
                                        padding: '1rem',
                                        height: 'fit-content',
                                        zIndex: '9999',
                                    }}
                                >
                                    <div className={styles['district-filter_panel']}>
                                        <Legend bigTitle={true} title='Период постройки'>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                <Legend
                                                    bigTitle={true}
                                                    title={`${periodFilter[0]} год`}
                                                />
                                                <Legend
                                                    bigTitle={true}
                                                    title={`${periodFilter[1]} год`}
                                                />
                                            </div>
                                            <Slider
                                                style={{ width: '250px' }}
                                                range={true}
                                                min={periodFilter[0]}
                                                max={periodFilter[1]}
                                                onAfterChange={(val) =>
                                                    setFilter((s) => ({
                                                        ...s,
                                                        startDate: val[0],
                                                        endDate: val[1],
                                                    }))
                                                }
                                            />
                                        </Legend>
                                        <Collapse>
                                            <Panel header='Фильтры' key='1'>
                                                <div className={styles.filters}>
                                                    <Input
                                                        placeholder='Кадастровый №'
                                                        value={kadastr}
                                                        onChange={(e) =>
                                                            setKadastr(e.currentTarget.value)
                                                        }
                                                    />
                                                    <Select
                                                        disabled={!filter?.districtId}
                                                        showSearch={true}
                                                        value={filter?.street}
                                                        placeholder='Улица'
                                                        onSelect={(e) => {
                                                            setFilter((s) => ({ ...s, street: e }));
                                                            setSelectedBuilding(undefined);
                                                        }}
                                                        options={createStreetsOptions()}
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '')
                                                                .toLowerCase()
                                                                .includes(input.toLowerCase())
                                                        }
                                                    />
                                                    <Select
                                                        disabled={disableBuildingSelect()}
                                                        showSearch={true}
                                                        value={selectedBuilding}
                                                        filterOption={(input, option) =>
                                                            (option?.label ?? '')
                                                                .toLowerCase()
                                                                .includes(input.toLowerCase())
                                                        }
                                                        onSelect={(val) => setSelectedBuilding(val)}
                                                        options={createSelectOptions()}
                                                        placeholder='Дом'
                                                    />
                                                </div>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </Plate>
                                <div className={styles.types}>
                                    <StatProgress
                                        progress={data?.countOfObject ?? 0}
                                        value={commonData?.countOfObject ?? 0}
                                        title='Кол-во объектов'
                                    />
                                    <StatProgress
                                        progress={data?.totalArea ?? 0}
                                        value={commonData?.totalArea ?? 0}
                                        measureUnit='м2'
                                        title='Площадь'
                                    />
                                    <StatProgress
                                        progress={data?.countOfFlat ?? 0}
                                        value={commonData?.countOfFlat ?? 0}
                                        title='Кол-во квартир'
                                    />
                                    <StatProgress value={100} progress={0} title='Жилые' />
                                    <StatProgress value={100} progress={0} title='Коммерческие' />
                                    <StatProgress value={100} progress={0} title='Муниципальные' />
                                </div>
                            </div>
                        </Plate>
                    )}
                    {selectedBuilding && (
                        <Plate className={styles['right-plate']}>
                            <div className={styles.current}>
                                <div className={styles['home-stats']}>
                                    <Typography.Title style={{ marginTop: 0 }} level={4}>
                                        {currentBuilding?.fullNameStr}
                                    </Typography.Title>
                                    <div className={styles['current-stats']}>
                                        <HomeStat
                                            data={currentBuilding?.year ?? ''}
                                            title='Период постройки'
                                        />
                                        <HomeStat
                                            data={`${currentBuilding?.area ?? 0} м2`}
                                            title='Площадь'
                                        />
                                        <HomeStat
                                            data={currentBuilding?.floor ?? ''}
                                            title='Этажность'
                                        />
                                        <HomeStat
                                            data={currentBuilding?.appartments ?? ''}
                                            title='Кол-во квартир'
                                        />
                                        <HomeStat data='' title='Тип эксплуатаций' />
                                        <HomeStat data='' title='Входит в программу:' />
                                    </div>
                                </div>
                                <div className={styles.pic} />
                                <div className={styles['details-button']}>
                                    <Button
                                        onClick={() =>
                                            router.push(`/details?id=${currentBuilding?.fid}`)
                                        }
                                        type='primary'
                                        icon={<RightOutlined />}
                                    />
                                </div>
                            </div>
                        </Plate>
                    )}
                </div>
            </div>
        </ContentWrapper>
    );
};
