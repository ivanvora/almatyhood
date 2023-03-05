import React, { ReactNode } from 'react';

import styles from './plate.module.css';

type Props = {
    children: ReactNode;
    style?: React.CSSProperties;
    className?: string;
};

export const Plate = ({ children, className, style }: Props) => (
    <div style={style} className={`${styles.body} ${className}`}>
        {children}
    </div>
);
