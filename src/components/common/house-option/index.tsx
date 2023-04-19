import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined, HeartOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import { Button } from 'antd';

import { client } from '@/modules/api';
import { TBuilding } from '@/modules/models/common';
import { GET_LIKES } from '@/modules/redux/actions';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks';

import Legend from '../legend';

import styles from './house-option.module.css';

type Props = {
    building: TBuilding;
};

export const HouseOption = ({ building }: Props) => {
    const dispatch = useAppDispatch();

    const { likes } = useAppSelector((s) => s.likesReducer);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const { fid } = building;

        const l = likes?.find((i) => i.fid === fid);

        setIsLiked(l?.fid === fid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likes]);

    const likeOperators = {
        addLike: (userid: number, fid: number) => {
            client.common.addLike(userid, fid).then((r) => {
                dispatch(GET_LIKES(userid));
                console.log(r.status);
            });
        },
        removeLike: (userid: number, fid: number) => {
            client.common.removeLike(userid, fid).then((r) => {
                dispatch(GET_LIKES(userid));
                console.log(r.status);
            });
        },
    };

    const switchLike = () => {
        const userid = Cookies.get('userId');
        const { fid } = building;

        if (userid && fid) {
            if (isLiked) {
                likeOperators.removeLike(+userid, fid);
            }
            if (!isLiked) {
                likeOperators.addLike(+userid, fid);
            }
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.pic} />
            <div className={styles.data}>
                <Legend style={{ fontSize: '1.3vh' }} title='Кол-во квартир'>
                    {building.appartments}
                </Legend>
                <Legend style={{ fontSize: '1.3vh' }} title='Период постройки'>
                    {building.year}
                </Legend>
                <Legend style={{ fontSize: '1.3vh' }} title='Район'>
                    {building.district_name}
                </Legend>
                <Legend style={{ fontSize: '1.3vh' }} title='Улица'>
                    {building.street}
                </Legend>
                <Legend style={{ fontSize: '1.3vh' }} title='Номер'>
                    {building.number}
                </Legend>
            </div>
            <div className={styles.control}>
                <Button
                    type={isLiked ? 'primary' : 'default'}
                    onClick={() => switchLike()}
                    icon={<HeartOutlined />}
                />
                <Button icon={<ArrowRightOutlined />} />
            </div>
        </div>
    );
};
