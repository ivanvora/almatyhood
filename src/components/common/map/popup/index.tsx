import React from 'react';
import ReactDOM from 'react-dom';
import { HeartOutlined, RightOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

import { Button } from 'antd';

import { client } from '@/modules/api';
import { GET_LIKES } from '@/modules/redux/actions';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks';

import Legend from '../../legend';

import styles from './popup.module.css';

export type TProps = {
    number?: string;
    year?: string;
    street?: string;
    district?: string;
    type?: string;
    fid?: number;
};

export default function Popup({ district, street, type, year, number, fid }: TProps) {
    const root = document.querySelectorAll('#building_popup');
    const dispatch = useAppDispatch();
    const { likes } = useAppSelector((s) => s.likesReducer);

    const isLiked = () => {
        if (likes && likes.length > 0) {
            const l = likes?.find((i) => i.fid === fid);

            return l !== undefined && l?.fid === fid;
        }

        return false;
    };

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

        if (userid && fid) {
            if (isLiked()) {
                likeOperators.removeLike(+userid, fid);
            }
            if (!isLiked()) {
                likeOperators.addLike(+userid, fid);
            }
        }
    };

    if (root.length > 0) {
        return ReactDOM.createPortal(
            <div className={styles.body}>
                <div className={styles.pic} />
                <div className={styles.data}>
                    <Legend title='Период постройки'>{year}</Legend>
                    <Legend title='Район'>{district}</Legend>
                    <Legend title='Улица'>{street}</Legend>
                    <Legend title='Номер'>{number}</Legend>
                    <Legend title='Тип эксплуатаций'>{type}</Legend>
                </div>
                <div className={styles.control}>
                    <Button
                        type={isLiked() ? 'primary' : 'default'}
                        icon={<HeartOutlined />}
                        onClick={() => switchLike()}
                    />
                    <Button type='primary' icon={<RightOutlined />} />
                </div>
            </div>,
            root[root.length - 1],
        );
    }

    return <div id='aaa' />;
}
