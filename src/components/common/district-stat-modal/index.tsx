import React from 'react';

import { Col, Input, Progress, Row, Select, Slider, Typography } from 'antd';

import { ContentWrapper } from '../content-wrapper';
import { MapScheme } from '../icons/map-scheme';
import Legend from '../legend';
import { Plate } from '../plate';
import { Top } from '../top';

import styles from './district-stat-modal.module.css';

const StatRow = ({ data, title }: { data: string; title: string }) => (
    <Legend bigTitle={true} title={title}>
        <Typography.Title style={{ marginTop: '10px' }} level={2}>
            {data}
        </Typography.Title>
    </Legend>
);

type TStatProgressProps = {
    progress: number;
    value: number;
    title: string;
};

const StatProgress = ({ progress, value, title }: TStatProgressProps) => {
    const percent = () => (value / 100) * progress;

    return (
        <div style={{ margin: '10px' }}>
            <Progress percent={percent()} />
            <Legend bigTitle={true} title={title}>
                <Typography.Title style={{ margin: '0' }} level={2}>
                    {progress}
                </Typography.Title>
            </Legend>
        </div>
    );
};

export const DistrictStat = () => (
    <ContentWrapper>
        <Top />
        <Row>
            <Col lg={12}>
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
                                    <Legend bigTitle={true} title='1967 год' />
                                    <Legend bigTitle={true} title='1979 год' />
                                </div>
                                <Slider
                                    style={{ width: '250px' }}
                                    range={true}
                                    min={1967}
                                    max={1979}
                                />
                            </Legend>
                            <StatRow data='1 403' title='Кол-во объектов' />
                            <StatRow data='1 403' title='Общая площадь' />
                            <StatRow data='1 403' title='Кол-во квартир' />
                            <StatRow data='1 403' title='Жилые' />
                            <StatRow data='1 403' title='Коммерческие' />
                            <StatRow data='1 403' title='Муниципальные' />
                        </div>
                        <MapScheme className={styles.map} selectMany={true} />
                    </div>
                </Plate>
            </Col>
            <Col lg={12}>
                <Plate className={styles['left-plate']}>
                    <Typography.Title style={{ margin: '0' }}>Турксибский</Typography.Title>
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
                                        <Legend bigTitle={true} title='1967 год' />
                                        <Legend bigTitle={true} title='1979 год' />
                                    </div>
                                    <Slider
                                        style={{ width: '250px' }}
                                        range={true}
                                        min={1967}
                                        max={1979}
                                    />
                                </Legend>
                                <Input placeholder='Кадастровый №' />
                                <Select placeholder='Улица' />
                                <Select placeholder='Дом' />
                            </div>
                        </Plate>
                        <div className={styles.types}>
                            <StatProgress value={100} progress={30} title='Кол-во объектов' />
                            <StatProgress value={100} progress={30} title='Площадь' />
                            <StatProgress value={100} progress={30} title='Кол-во квартир' />
                            <StatProgress value={100} progress={30} title='Жилые' />
                            <StatProgress value={100} progress={30} title='Коммерческие' />
                            <StatProgress value={100} progress={30} title='Муниципальные' />
                        </div>
                    </div>
                </Plate>
                <Plate className={styles['left-plate']}>
                    <div className={styles.current}>
                        <div className={styles['current-stats']}>
                            <StatRow data='1 403' title='Период постройки' />
                            <StatRow data='1 403' title='Площадь' />
                            <StatRow data='1 403' title='Этажность' />
                            <StatRow data='1 403' title='Кол-во квартир' />
                            <StatRow data='1 403' title='Тип эксплуатаций' />
                            <StatRow data='1 403' title='Входит в программу:' />
                        </div>
                        <div className={styles.pic} />
                    </div>
                </Plate>
            </Col>
        </Row>
    </ContentWrapper>
);
