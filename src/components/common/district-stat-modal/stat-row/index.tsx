import React from 'react';

import { Typography } from 'antd';

import Legend from '../../legend';

export const StatRow = ({ data, title }: { data: string | number; title: string }) => (
    <Legend bigTitle={true} title={title}>
        <Typography.Title style={{ marginTop: '10px' }} level={2}>
            {data}
        </Typography.Title>
    </Legend>
);
