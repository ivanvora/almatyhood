import React, { ReactNode } from 'react';

import styles from './content-wrapper.module.css';

type Props = {
    children: ReactNode;
};

export const ContentWrapper = ({ children }: Props) => (
    <div className={styles.body}>{children}</div>
);
