import React from 'react';
import { useRouter } from 'next/router';

import { Typography } from 'antd';

import { Logo } from '../icons/logo';
import { Plate } from '../plate';

import styles from './page-error.module.css';

type Props = {
    code?: number;
    text?: string;
};

export const PageError = ({ code, text }: Props) => {
    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <Plate className={styles.plate}>
                <div className={styles.body}>
                    <Logo colorRevert={true} />
                    <Typography.Title>{`${text} - (${code})`}</Typography.Title>
                    <Typography.Link onClick={() => router.push('/')}>На главную</Typography.Link>
                </div>
            </Plate>
        </div>
    );
};
