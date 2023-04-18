import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, HeartOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Typography } from 'antd';

import { Plate } from '@/components/common/plate';
import { Top } from '@/components/common/top';
import { client } from '@/modules/api';
import { TBuilding } from '@/modules/models/common';
import { GET_LIKES } from '@/modules/redux/actions';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks';

import { InfoRow } from './info-row';

import styles from './details.module.css';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

// const mock: TBuilding = {
//     year: 1958,
//     appartments: 120,
//     fullNameStr: 'Медеуский район, ул. Манаса. 154 А',
//     floor: 5,
//     number: '3',
// };

export const DetailsPage = () => {
    const [building, setBuilding] = useState<TBuilding>();

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            client.common.getBuildingById(+id).then((res) => setBuilding(res.data[0]));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const dispatch = useAppDispatch();
    const { likes } = useAppSelector((s) => s.likesReducer);

    const isLiked = () => {
        if (likes && likes.length > 0) {
            const l = likes?.find((i) => i.fid === id);

            return l !== undefined && l?.fid === id;
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

        if (userid && id) {
            if (isLiked()) {
                likeOperators.removeLike(+userid, +id);
            }
            if (!isLiked()) {
                likeOperators.addLike(+userid, +id);
            }
        }
    };

    return (
        <React.Fragment>
            <Map preload={false} />
            <div className={styles.body}>
                <Top>
                    <div className={styles.top}>
                        <Button onClick={() => router.push('/main')} icon={<ArrowLeftOutlined />}>
                            Назад
                        </Button>
                    </div>
                </Top>
                <Plate className={styles.plate}>
                    <div className={styles.data}>
                        <div className={styles['pic-container']}>
                            <div className={styles.pic} />
                        </div>
                        <div className={styles['main-info']}>
                            <Typography.Title>{building?.fullNameStr ?? ''}</Typography.Title>
                            <div className={styles.stats}>
                                <InfoRow data={building?.year ?? ''} title='Период постройки' />
                                <InfoRow data={building?.floor ?? ''} title='Этажность' />
                                <InfoRow
                                    data={building?.build_type ?? ''}
                                    title='Тип эксплуатаций'
                                />
                                <InfoRow data={`${building?.area ?? ''} м2`} title='Площадь' />
                                <InfoRow
                                    data={building?.appartments ?? ''}
                                    title='Кол-во квартир'
                                />
                                <InfoRow data={building?.pdp ?? ''} title='Программа:' />
                            </div>
                            <div>
                                <Typography.Title level={3}>Документы</Typography.Title>
                            </div>
                        </div>
                    </div>
                    <div className={styles.favor}>
                        <Button
                            type={isLiked() ? 'primary' : 'default'}
                            onClick={() => switchLike()}
                            icon={<HeartOutlined />}
                        />
                    </div>
                </Plate>
            </div>
        </React.Fragment>
    );
};
