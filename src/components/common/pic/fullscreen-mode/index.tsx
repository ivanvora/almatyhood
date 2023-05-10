/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import { CloseOutlined } from '@ant-design/icons';

import { TPicture } from '../models';

import styles from './fullscreen-mode.module.css';

type Props = {
    onClose: () => void;
    onMoveClick: (e?: 'next' | 'previous') => void;
    currentPic: TPicture;
};

export const getDirection = (direction: string) => {
    if (direction === 'ArrowRight') return 'next';
    if (direction === 'ArrowLeft') return 'previous';

    return undefined;
};
export const FullScreen = ({ currentPic, onMoveClick, onClose }: Props) => (
    <div
        tabIndex={0}
        onKeyDown={(e) => onMoveClick(getDirection(e.code))}
        className={styles.container}
    >
        <div className={styles.close} onClick={() => onClose()}>
            <CloseOutlined />
        </div>
        <div className={styles.controls}>
            <div onClick={() => onMoveClick('previous')} />
            <div onClick={() => onMoveClick('next')} />
        </div>
        <div style={{ backgroundImage: `url(${currentPic.url})` }} className={styles.pic} />
    </div>
);
