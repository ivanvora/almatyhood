import React from 'react';

import { Typography } from 'antd';

import Legend from '@/components/common/legend';

type Props = { title: string; data?: string | number };

export const InfoRow = ({ title, data }: Props) => (
    <Legend bigTitle={true} title={title}>
        <Typography.Title level={3}>{data}</Typography.Title>
    </Legend>
);
