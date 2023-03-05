import React, { ReactNode } from 'react';

import { Logo } from '../icons/logo';

import styles from './top.module.css';

export type TProps = {
    children?: ReactNode;
};

export const Top = ({ children }: TProps) => (
    <div className={styles['top-backlayer']}>
        <div>
            <Logo />
        </div>
        {children}
    </div>
);
