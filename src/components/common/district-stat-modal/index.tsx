import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Button, Input, Select, Slider, Typography } from 'antd';

import { client } from '@/modules/api';
import { DISTRICTS_MAP } from '@/modules/dictionary';
import { useFilterBuildings, useGetCommonInfo } from '@/modules/hooks';
import { TBuilding, TFilterBuildingQuery } from '@/modules/models/common';

import { ContentWrapper } from '../content-wrapper';
import { MapScheme } from '../icons/map-scheme';
import Legend from '../legend';
import { Plate } from '../plate';
import { Top } from '../top';

import { StatProgress } from './stat-progress';
import { StatRow } from './stat-row';

import styles from './district-stat-modal.module.css';

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

    useEffect(() => {
        if (filterCommon.startDate) {
            setPeriodFilter((s) => [filterCommon.startDate ?? STARTDATEF, s[1]]);
        }
        if (filterCommon.endDate) {
            setPeriodFilter((s) => [s[0], filterCommon.endDate ?? ENDDATEF]);
        }
    }, [filterCommon]);

    useEffect(() => {
        if (selectedBuilding) {
            client.common
                .getBuildingById(selectedBuilding)
                .then((res) => setCurrentBuilding(res.data[0]))
                .catch((err) => console.log(err));
        }
    }, [selectedBuilding]);

    const { data } = useFilterBuildings(filter);

    const { data: commonData } = useGetCommonInfo(filterCommon);

    const getDistrictMap = (key: TDistrict) => DISTRICTS_MAP[key];

    const createSelectOptions = () => {
        if (data && data.gisBuildings && filter.districtId) {
            return data?.gisBuildings?.map((item) => ({
                value: item.gid,
                label: item.fullNameStr,
            }));
        }

        return undefined;
    };

    return (
        <ContentWrapper>
            <Top>
                <Button style={{ marginRight: '50px' }} onClick={() => router.push('/main')}>
                    Карта
                </Button>
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
                                        style={{ width: '250px' }}
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
                                <StatRow data='' title='Общая площадь' />
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
                                    setFilter((s) => ({
                                        ...s,
                                        districtId: getDistrictMap(d as TDistrict).id,
                                    }));
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
                            <Typography.Title style={{ margin: '0' }}>
                                {districtName}
                            </Typography.Title>
                            <div className={styles['district-filter']}>
                                <Plate>
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
                                        <Input placeholder='Кадастровый №' />
                                        <Input
                                            placeholder='Улица'
                                            onInput={(e) => {
                                                setFilter((s) => ({
                                                    ...s,
                                                    street: e?.currentTarget?.value,
                                                }));
                                            }}
                                        />
                                        <Select
                                            showSearch={true}
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
                                <div className={styles['current-stats']}>
                                    <StatRow
                                        data={currentBuilding?.year ?? ''}
                                        title='Период постройки'
                                    />
                                    <StatRow data='' title='Площадь' />
                                    <StatRow
                                        data={currentBuilding?.floor ?? ''}
                                        title='Этажность'
                                    />
                                    <StatRow
                                        data={currentBuilding?.appartments ?? ''}
                                        title='Кол-во квартир'
                                    />
                                    <StatRow data='' title='Тип эксплуатаций' />
                                    <StatRow data='' title='Входит в программу:' />
                                </div>
                                <div className={styles.pic} />
                            </div>
                        </Plate>
                    )}
                </div>
            </div>
        </ContentWrapper>
    );
};
