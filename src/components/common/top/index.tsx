import React from 'react';

import { Button, Input, Select } from 'antd';

import { Bookmark } from '../icons/bookmark';
import { Clock } from '../icons/clock';
import { Logo } from '../icons/logo';

import styles from './top.module.css';

export const Top = () => (
    <div className={styles['top-backlayer']}>
        <div>
            <Logo />
        </div>
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
            <Select placeholder='Район' />
            <Select placeholder='Улица' />
            <Select placeholder='Дом' />
        </div>
        <div>auth</div>
    </div>
);
