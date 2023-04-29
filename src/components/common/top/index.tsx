import React, { ReactNode } from 'react';
import { ArrowLeftOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { Button } from 'antd';

import { Logo } from '../icons/logo';

import styles from './top.module.css';

export type TProps = {
    children?: ReactNode;
};

export const Top = ({ children }: TProps) => {
    const router = useRouter();
    const currentUrl = router.route;

    return (
        <div id='ddd' className={styles['top-backlayer']}>
            <div>
                <Logo />
            </div>
            {children}
            <div style={{ display: 'flex', gap: '6px' }}>
                <Button
                    icon={currentUrl === '/profile' ? <ArrowLeftOutlined /> : <UserOutlined />}
                    onClick={() => {
                        if (currentUrl === '/profile') {
                            router.back();
                        } else {
                            router.push('/profile');
                        }
                    }}
                />
                <Button icon={<LogoutOutlined />} onClick={() => router.push('/')} />
            </div>
        </div>
    );
};
