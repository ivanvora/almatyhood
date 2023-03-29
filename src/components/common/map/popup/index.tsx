import React from 'react';
import ReactDOM from 'react-dom';
import { RightOutlined, StarFilled } from '@ant-design/icons';

import { Button } from 'antd';

import { StatRow } from '../../district-stat-modal/stat-row';

export type TProps = {
    number?: string;
    year?: string;
    street?: string;
    district?: string;
    type?: string;
};

export default function Popup({ district, street, type, year, number }: TProps) {
    const root = document.querySelector('#building_popup');

    if (root) {
        return ReactDOM.createPortal(
            <div style={{ zIndex: '99999', width: '400px' }}>
                <div>
                    <StatRow data={year ?? ''} title='Период постройки' />
                    <StatRow data={number ?? ''} title='Номер здания' />
                </div>
                <div>
                    <StatRow data={district ?? ''} title='Район' />
                    <StatRow data={street ?? ''} title='Улица' />
                    <StatRow data={type ?? ''} title='Тип эксплуатаций' />
                </div>
                <div>
                    <Button icon={<StarFilled />} />
                    <Button type='primary' icon={<RightOutlined />} />
                </div>
            </div>,
            root,
        );
    }

    return <div id='aaa'>dsadsda</div>;
}
