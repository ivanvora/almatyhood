import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Input } from 'antd';

import { client } from '@/modules/api';

import { Logo } from '../../common/icons/logo';
import { Plate } from '../../common/plate';

import styles from './auth.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Auth = () => {
    const router = useRouter();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onEnter = () => {
        client.security.login(login, password).then((res) => {
            Cookies.set('accessToken', res.data.accessToken);
            router.push('/main');
        });
    };

    return (
        <React.Fragment>
            <Map />
            <div className={styles.page}>
                <Plate style={{ height: '100%' }}>
                    <div className={styles.body}>
                        <div className={styles.top}>
                            <Logo colorRevert={true} />
                        </div>
                        <div className={styles.center}>
                            <Input
                                size='large'
                                placeholder='Логин / e-mail'
                                value={login}
                                onInput={(e) => setLogin(e.currentTarget.value)}
                            />
                            <Input.Password
                                size='large'
                                placeholder='Пароль'
                                value={password}
                                onInput={(e) => setPassword(e.currentTarget.value)}
                            />
                            <Button type='primary' size='large' block={true} onClick={onEnter}>
                                Вход
                            </Button>
                        </div>
                    </div>
                </Plate>
            </div>
        </React.Fragment>
    );
};
