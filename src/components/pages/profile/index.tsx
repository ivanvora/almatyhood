import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import { Button, Input } from 'antd';

import { Plate } from '@/components/common/plate';
import { Top } from '@/components/common/top';
import { client } from '@/modules/api';
import { TProfile } from '@/modules/models/security';

import styles from './profile.module.css';

export function ProfilePage() {
    const [profile, setProfile] = useState<TProfile>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userid = Cookies.get('userId');

        if (userid) {
            setIsLoading(true);
            client.security
                .getProfile(+userid)
                .then((res) => {
                    setProfile(res.data);
                    setIsLoading(false);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    const saveProfile = () => {
        if (profile) {
            client.security.updateProfile(profile);
        }
    };

    const main = (
        <div className={styles.main}>
            <div className={styles.photo} />
            <div className={styles.control}>
                <Input
                    placeholder='login'
                    value={profile?.name}
                    onChange={(e) => {
                        if (e && e.currentTarget) {
                            setProfile((s) => ({ name: e.currentTarget.value, ...s }));
                        }
                    }}
                />
                <Input
                    placeholder='email'
                    value={profile?.email}
                    onChange={(e) => {
                        if (e && e.currentTarget) {
                            setProfile((s) => ({ email: e.currentTarget.value, ...s }));
                        }
                    }}
                />
                <Input.Password
                    placeholder='password'
                    value={profile?.password}
                    onChange={(e) => {
                        if (e && e.currentTarget) {
                            setProfile((s) => ({ email: e.currentTarget.value, ...s }));
                        }
                    }}
                />
                <Button onClick={() => saveProfile()}>Cохранить</Button>
            </div>
        </div>
    );

    return (
        <div className={styles.body}>
            <Top />
            <div className={styles.content}>
                <Plate className={styles.plate}>{isLoading ? <LoadingOutlined /> : main}</Plate>
            </div>
        </div>
    );
}
