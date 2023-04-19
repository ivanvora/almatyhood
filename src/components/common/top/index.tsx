import React, { ReactNode } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { Button } from 'antd';

import { Logo } from '../icons/logo';

import styles from './top.module.css';

export type TProps = {
    children?: ReactNode;
};

export const Top = ({ children }: TProps) => {
    const router = useRouter();

    return (
        <div id='ddd' className={styles['top-backlayer']}>
            <div>
                <Logo />
            </div>
            {children}
            <div>
                <Button icon={<LogoutOutlined />} onClick={() => router.push('/')} />
            </div>
        </div>
    );
};
