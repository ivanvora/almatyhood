import React, { ReactNode } from 'react';

import styles from './legend.module.css';

type Props = {
    title: string | number;
    children?: ReactNode | ReactNode[] | string | number;
};

export default function Legend({ title, children }: Props) {
    return (
        <div className={styles.body}>
            {children}
            <div className={styles.title}>{title}</div>
        </div>
    );
}
