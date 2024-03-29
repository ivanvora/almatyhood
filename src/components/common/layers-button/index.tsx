import React, { CSSProperties, useState } from 'react';

import { Button } from 'antd';

import { LayersIcon } from '../icons/layers';
import Legend from '../legend';

import styles from './layers-button.module.css';

export type TLayersButtonProps = {
    onBordersClick: (status: boolean) => void;
    onDistrictsClick: (status: boolean) => void;
    onRedlinesClick: (status: boolean) => void;
    onLakesClick: (status: boolean) => void;
    onRiversClick: (status: boolean) => void;
    onSeismoClick: (status: boolean) => void;
    onWaterGuardZoneClick: (status: boolean) => void;
    onWaterGuardStripClick: (status: boolean) => void;
};

export const LayersButton = ({
    onBordersClick,
    onDistrictsClick,
    onRedlinesClick,
    onLakesClick,
    onRiversClick,
    onSeismoClick,
    onWaterGuardStripClick,
    onWaterGuardZoneClick,
}: TLayersButtonProps) => {
    const [isBorders, setIsBorders] = useState(false);
    const [isRedlines, setIsRedlines] = useState(false);
    const [isDistricts, setIsDistricts] = useState(false);
    const [isSeismo, setIsSeismo] = useState(false);
    const [isLakes, setIsLakes] = useState(false);
    const [isRivers, setIsRivers] = useState(false);
    const [isWaterGuardZone, setIsWaterGuardZone] = useState(false);
    const [isWaterGuardStrip, setIsWaterGuardStrip] = useState(false);

    const style: CSSProperties = { textAlign: 'center', fontSize: '9px' };

    return (
        <div className={styles.body}>
            <Button className={styles.layers}>
                <LayersIcon color='black' />
            </Button>
            <div className={styles.menu}>
                <Legend title='Границы' style={style} isSubTitle={true}>
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
                <Legend title='Районы' style={style} isSubTitle={true}>
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
                <Legend title='Красные линии' style={style} isSubTitle={true}>
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
                <Legend title='Озера' style={style} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsLakes((s) => !s);
                            onLakesClick(isLakes);
                        }}
                        className={`${styles['layer-button']} ${styles.lakes} ${
                            isLakes ? styles.active : ''
                        }`}
                    />
                </Legend>
                <Legend title='Реки' style={style} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsRivers((s) => !s);
                            onRiversClick(isRivers);
                        }}
                        className={`${styles['layer-button']} ${styles.rivers} ${
                            isRivers ? styles.active : ''
                        }`}
                    />
                </Legend>
                <Legend title='Водоохранная зона' style={style} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsWaterGuardZone((s) => !s);
                            onWaterGuardZoneClick(isWaterGuardZone);
                        }}
                        className={`${styles['layer-button']} ${styles.rivers} ${
                            isWaterGuardZone ? styles.active : ''
                        }`}
                    />
                </Legend>
                <Legend title='Водоохранная полоса' style={style} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsWaterGuardStrip((s) => !s);
                            onWaterGuardStripClick(isWaterGuardStrip);
                        }}
                        className={`${styles['layer-button']} ${styles.rivers} ${
                            isWaterGuardStrip ? styles.active : ''
                        }`}
                    />
                </Legend>
                <Legend title='Сейсмо' style={style} isSubTitle={true}>
                    <Button
                        onClick={() => {
                            setIsSeismo((s) => !s);
                            onSeismoClick(isSeismo);
                        }}
                        className={`${styles['layer-button']} ${styles.seismo} ${
                            isSeismo ? styles.active : ''
                        }`}
                    />
                </Legend>
            </div>
        </div>
    );
};
