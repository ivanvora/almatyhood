/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState } from 'react';

import { FullScreen, getDirection } from './fullscreen-mode';
import { MainPic } from './main';
import { TPicture } from './models';

import styles from './pic.module.css';

type Props = {
    pics: TPicture[];
    slidesPosition?: 'top' | 'bottom' | 'left' | 'right';
};

export const Pic = ({ pics, slidesPosition = 'left' }: Props) => {
    const [selectedPic, setSelectedPic] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const isAside = slidesPosition === 'left' || slidesPosition === 'right';

    const createPics = () =>
        pics.map((i, index) => (
            <div
                key={index}
                onMouseEnter={() => setSelectedPic(index)}
                style={{ backgroundImage: `url(${i.url})` }}
                className={`${styles['mini-pic']} ${isAside && styles['mini-pic__position-aside']}`}
            />
        ));

    const setNextPic = (direction?: 'next' | 'previous') => {
        if (direction === 'next') {
            const l = pics.length - 1;

            if (selectedPic === l) {
                setSelectedPic(0);
            } else {
                setSelectedPic((s) => s + 1);
            }
        }
        if (direction === 'previous') {
            if (selectedPic === 0) {
                setSelectedPic(pics.length - 1);
            } else {
                setSelectedPic((s) => s - 1);
            }
        }
    };

    return (
        <React.Fragment>
            {isFullScreen && (
                <FullScreen
                    currentPic={pics[selectedPic]}
                    onClose={() => setIsFullScreen(false)}
                    onMoveClick={(e) => setNextPic(e)}
                />
            )}
            <div
                tabIndex={0}
                onKeyDown={(e) => setNextPic(getDirection(e.code))}
                className={`${styles.container}  ${
                    styles[`container__position-${slidesPosition}`]
                }`}
            >
                <div className={styles['main-container']}>
                    <MainPic onClick={() => setIsFullScreen(true)} picture={pics[selectedPic]} />
                </div>
                <div
                    className={`${styles['pics-container']} ${
                        isAside && styles['pics-container__position-aside']
                    }`}
                >
                    {createPics()}
                </div>
            </div>
        </React.Fragment>
    );
};
