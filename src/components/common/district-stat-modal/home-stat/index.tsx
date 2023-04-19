import React from 'react';

import { Typography } from 'antd';

import Legend from '../../legend';

export const HomeStat = ({ data, title }: { data: string | number; title: string }) => (
    <Legend title={title}>
        <Typography.Title style={{ margin: '0', fontSize: '1vw' }} level={2}>
            {data}
        </Typography.Title>
    </Legend>
);
