import React from 'react';

import { Progress, Typography } from 'antd';

import Legend from '../../legend';

type TStatProgressProps = {
    progress: number;
    value: number;
    title: string;
    measureUnit?: string;
};

export const StatProgress = ({ progress, value, title, measureUnit }: TStatProgressProps) => {
    const percent = () => Math.round(progress / (value / 100));

    return (
        <div>
            <Progress percent={percent()} />
            <Legend bigTitle={false} title={title}>
                <Typography.Title style={{ margin: '0', fontSize: '1vw' }} level={2}>
                    {`${progress} ${measureUnit ?? ''}`}
                </Typography.Title>
            </Legend>
        </div>
    );
};
