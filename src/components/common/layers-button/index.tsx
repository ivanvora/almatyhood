import React, { useState } from 'react';

import { Button } from 'antd';

import { LayersIcon } from '../icons/layers';
import Legend from '../legend';

import styles from './layers-button.module.css';

export type TLayersButtonProps = {
    onBordersClick: (status: boolean) => void;
    onDistrictsClick: (status: boolean) => void;
    onRedlinesClick: (status: boolean) => void;
};

export const LayersButton = ({
    onBordersClick,
    onDistrictsClick,
    onRedlinesClick,
}: TLayersButtonProps) => {
    const [isBorders, setIsBorders] = useState(false);
    const [isRedlines, setIsRedlines] = useState(false);
    const [isDistricts, setIsDistricts] = useState(false);

    return (
        <div className={styles.body}>
            <Button className={styles.layers}>
                <LayersIcon color='black' />
            </Button>
            <div className={styles.menu}>
                <Legend title='Границы' style={{ textAlign: 'center' }} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsBorders((s) => !s);
                            onBordersClick(isBorders);
                        }}
                        className={`${styles['layer-button']} ${styles.border} ${
                            isBorders ? styles.active : ''
                        }`}
                    />
                </Legend>
                <Legend title='Районы' style={{ textAlign: 'center' }} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsDistricts((s) => !s);
                            onDistrictsClick(isDistricts);
                        }}
                        className={`${styles['layer-button']} ${styles.districts} ${
                            isDistricts ? styles.active : ''
                        }`}
                    />
                </Legend>
                <Legend title='Красные линии' style={{ textAlign: 'center' }} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsRedlines((s) => !s);
                            onRedlinesClick(isRedlines);
                        }}
                        className={`${styles['layer-button']} ${styles.redlines} ${
                            isRedlines ? styles.active : ''
                        }`}
                    />
                </Legend>
            </div>
        </div>
    );
};
