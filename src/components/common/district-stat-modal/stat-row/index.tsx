import React from 'react';

import { Typography } from 'antd';

import Legend from '../../legend';

export const StatRow = ({ data, title }: { data: string | number; title: string }) => (
    <Legend title={title}>
        <Typography.Title style={{ marginTop: '1vh', fontSize: '1.5vw' }} level={2}>
            {data}
        </Typography.Title>
    </Legend>
);
