/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import { TPicture } from '../models';

import styles from './main-pic.module.css';

type Props = {
    picture: TPicture;
    onClick?: () => void;
};

export const MainPic = ({ picture, onClick }: Props) => (
    <div
        onClick={onClick}
        style={{ backgroundImage: `url(${picture.url})` }}
        className={styles['main-pic']}
    />
);
