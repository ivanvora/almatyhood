import React from 'react';

import { Progress, Typography } from 'antd';

import Legend from '../../legend';

type TStatProgressProps = {
    progress: number;
    value: number;
    title: string;
};

export const StatProgress = ({ progress, value, title }: TStatProgressProps) => {
    const percent = () => Math.round(progress / (value / 100));

    return (
        <div style={{ margin: '1rem' }}>
            <Progress percent={percent()} />
            <Legend bigTitle={true} title={title}>
                <Typography.Title style={{ margin: '0', fontSize: '1rem' }} level={2}>
                    {progress}
                </Typography.Title>
            </Legend>
        </div>
    );
};
