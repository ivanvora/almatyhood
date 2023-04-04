import React from 'react';
import ReactDOM from 'react-dom';
import { RightOutlined, StarFilled } from '@ant-design/icons';

import { Button } from 'antd';

import Legend from '../../legend';

import styles from './popup.module.css';

export type TProps = {
    number?: string;
    year?: string;
    street?: string;
    district?: string;
    type?: string;
};

export default function Popup({ district, street, type, year, number }: TProps) {
    const root = document.querySelectorAll('#building_popup');

    if (root.length > 0) {
        return ReactDOM.createPortal(
            <div className={styles.body}>
                <div className={styles.pic} />
                <div className={styles.data}>
                    <Legend title='Период постройки'>{year}</Legend>
                    <Legend title='Район'>{district}</Legend>
                    <Legend title='Улица'>{street}</Legend>
                    <Legend title='Номер'>{number}</Legend>
                    <Legend title='Тип эксплуатаций'>{type}</Legend>
                </div>
                <div className={styles.control}>
                    <Button icon={<StarFilled />} />
                    <Button type='primary' icon={<RightOutlined />} />
                </div>
            </div>,
            root[root.length - 1],
        );
    }

    return <div id='aaa'>dsadsda</div>;
}
