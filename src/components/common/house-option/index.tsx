import React from 'react';
import { ArrowRightOutlined, StarFilled } from '@ant-design/icons';

import { Button } from 'antd';

import { TBuilding } from '@/modules/models/common';

import Legend from '../legend';

import styles from './house-option.module.css';

type Props = {
    building: TBuilding;
};

export const HouseOption = ({ building }: Props) => (
    <div className={styles.body}>
        <div className={styles.pic} />
        <div className={styles.data}>
            <Legend title='Кол-во квартир'>{building.appartments}</Legend>
            <Legend title='Период постройки'>{building.year}</Legend>
            <Legend title='Район'>{building.district_name}</Legend>
            <Legend title='Улица'>{building.street}</Legend>
            <Legend title='Номер'>{building.number}</Legend>
        </div>
        <div className={styles.control}>
            <Button icon={<StarFilled />} />
            <Button icon={<ArrowRightOutlined />} />
        </div>
    </div>
);
