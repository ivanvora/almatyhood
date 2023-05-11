import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, HeartOutlined, LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Button, Typography } from 'antd';

import { Pic } from '@/components/common/pic';
import { Plate } from '@/components/common/plate';
import { Top } from '@/components/common/top';
import { client } from '@/modules/api';
import { TBuilding } from '@/modules/models/common';
import { GET_LIKES } from '@/modules/redux/actions';
import { useAppDispatch, useAppSelector } from '@/modules/redux/hooks';

import ppp from '../../../assets/house.png';

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
    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            client.common
                .getBuildingById(+id)
                .then((res) => {
                    setBuilding(res.data[0]);
                    setIsLoading(false);
                })
                .catch(() => setIsLoading(false));
        }
    }, [id]);

    const dispatch = useAppDispatch();
    const { likes } = useAppSelector((s) => s.likesReducer);

    useEffect(() => {
        if (likes && likes.length > 0) {
            const l = likes?.find((i) => i.fid === id);

            setIsLiked(l !== undefined && l?.fid === id);
        }
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

        if (userid && id) {
            if (isLiked) {
                likeOperators.removeLike(+userid, +id);
            }
            if (!isLiked) {
                likeOperators.addLike(+userid, +id);
            }
        }
    };

    console.log(ppp.src);
    const mainContent = (
        <React.Fragment>
            <div className={styles.data}>
                <div className={styles['pic-container']}>
                    <Pic
                        pics={[
                            { url: 'https://static.kulturologia.ru/files/u23581/235810660.jpg' },
                            { url: 'https://realt.by/uploads/pics/20210716_110758.jpg' },
                            {
                                url: 'https://moslenta.ru/imgs/2016/03/30/17/43532/ad22681471f418565900f356134fdeffba5f4bf0.jpg',
                            },
                            {
                                url: 'https://img-fotki.yandex.ru/get/509292/33089952.b9/0_1afd8c_e67c6986_orig.jpg',
                            },
                            {
                                url: 'https://aif-s3.aif.ru/images/008/125/7a4973e5d8fc6dcf329a5eba7ffd2126.jpg',
                            },
                            {
                                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmxd77PKCsUdXysT2VKZ36ydhN9mrA-sCZHw&usqp=CAU',
                            },
                            { url: ppp.src },
                        ]}
                        slidesPosition='bottom'
                    />
                </div>
                <div className={styles['main-info']}>
                    <Typography.Title>{building?.fullNameStr ?? ''}</Typography.Title>
                    <div className={styles.stats}>
                        <InfoRow data={building?.year ?? ''} title='Период постройки' />
                        <InfoRow data={building?.floor ?? ''} title='Этажность' />
                        <InfoRow data={building?.build_type ?? ''} title='Тип эксплуатаций' />
                        <InfoRow data={`${building?.area ?? ''} м2`} title='Площадь' />
                        <InfoRow data={building?.appartments ?? ''} title='Кол-во квартир' />
                        <InfoRow data={building?.pdp ?? ''} title='Программа:' />
                        <InfoRow
                            data={building?.water_zone ? 'да' : 'нет'}
                            title='Водоохранная зона'
                        />
                        <InfoRow
                            data={building?.water_line ? 'да' : 'нет'}
                            title='Водоохранная полоса'
                        />
                        <InfoRow data={building?.gis_Seism?.type} title='Сейсмоактивность' />
                    </div>
                    {/* <div>
                        <Typography.Title level={3}>Документы</Typography.Title>
                    </div> */}
                </div>
            </div>
            <div className={styles.favor}>
                <Button
                    type={isLiked ? 'primary' : 'default'}
                    onClick={() => switchLike()}
                    icon={<HeartOutlined />}
                />
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Map preload={false} />
            <div className={styles.body}>
                <Top>
                    <div className={styles.top}>
                        <Button onClick={() => router.back()} icon={<ArrowLeftOutlined />}>
                            Назад
                        </Button>
                    </div>
                </Top>
                <Plate className={styles.plate}>
                    {isLoading ? (
                        <div className={styles.loader}>
                            <LoadingOutlined style={{ fontSize: '72px' }} />
                        </div>
                    ) : (
                        mainContent
                    )}
                </Plate>
            </div>
        </React.Fragment>
    );
};
