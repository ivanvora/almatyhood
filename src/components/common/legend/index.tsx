import React, { ReactNode } from 'react';

import styles from './legend.module.css';

type Props = {
    title: string | number;
    children?: ReactNode | ReactNode[] | string | number;
    isSubTitle?: boolean;
    bigTitle?: boolean;
    style?: React.CSSProperties;
};

export default function Legend({ title, children, isSubTitle, style, bigTitle }: Props) {
    return (
        <div
            className={`${styles.body} 
            ${isSubTitle ? styles['sub-title'] : ''} 
            `}
        >
            <div style={style} className={`${styles.title} ${bigTitle ? styles['big-title'] : ''}`}>
                {title}
            </div>
            {children}
        </div>
    );
}
