import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Typography } from 'antd';

import { Logo } from '../icons/logo';
import { Plate } from '../plate';

import styles from './page-error.module.css';

type Props = {
    code?: number;
    text?: string;
    title?: string;
    content?: ReactNode;
};

export const PageError = ({ code, content, text = '', title = '' }: Props) => {
    const router = useRouter();

    return (
        <div className={styles.wrapper}>
            <Plate className={styles.plate}>
                <div className={styles.body}>
                    <Logo colorRevert={true} />
                    <Typography.Title>{code}</Typography.Title>
                    <Typography.Title level={3}>{title}</Typography.Title>
                    <Typography.Text>{text}</Typography.Text>
                    {content || (
                        <Typography.Link onClick={() => router.back()}>Назад</Typography.Link>
                    )}
                </div>
            </Plate>
        </div>
    );
};
