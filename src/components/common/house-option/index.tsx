import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined, StarFilled } from '@ant-design/icons';
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

    const addLike = () => {
        const userid = Cookies.get('userId');
        const { fid } = building;

        if (userid && fid) {
            client.common.addLike(+userid, fid).then((r) => {
                dispatch(GET_LIKES(+userid));
                console.log(r.status);
            });
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.pic} />
            <div className={styles.data}>
                <Legend title='Кол-во квартир'>{building.appartments}</Legend>
                <Legend title='Период постройки'>{building.year}</Legend>
                <Legend title='Район'>{building.district_name}</Legend>
                <Legend title='Улица'>{building.street}</Legend>
                <Legend title='Номер'>{building.number}</Legend>
            </div>
            <div className={styles.control}>
                <Button
                    type={isLiked ? 'primary' : 'default'}
                    onClick={() => addLike()}
                    icon={<StarFilled />}
                />
                <Button icon={<ArrowRightOutlined />} />
            </div>
        </div>
    );
};
