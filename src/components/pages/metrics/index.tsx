import React from 'react';
import dynamic from 'next/dynamic';

import { DistrictStat } from '@/components/common/district-stat-modal';

// import Map from '@/components/common/map';

const Map = dynamic(() => import('@/components/common/map'), { ssr: false });

export const Metrics = () => (
    <React.Fragment>
        <Map preload={false} />
        <DistrictStat />
    </React.Fragment>
);
