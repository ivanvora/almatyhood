import React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Input } from 'antd';

import { Logo } from '../../common/icons/logo';
import { Plate } from '../../common/plate';

import styles from './auth.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Auth = () => {
    const router = useRouter();

    return (
        <React.Fragment>
            <Map />
            <div className={styles.page}>
                <Plate>
                    <div className={styles.body}>
                        <div className={styles.top}>
                            <Logo colorRevert={true} />
                        </div>
                        <div className={styles.center}>
                            <Input placeholder='Логин / e-mail' />
                            <Input placeholder='Пароль' />
                            <Button type='primary' size='large' onClick={() => router.push('/map')}>
                                Вход
                            </Button>
                        </div>
                    </div>
                </Plate>
            </div>
        </React.Fragment>
    );
};
