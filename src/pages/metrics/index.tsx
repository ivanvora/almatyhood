import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Metrics as MetricsPage } from '@/components/pages/metrics';

const Metrics: NextPage = () => <MetricsPage />;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['metrics'])),
    },
});

export default Metrics;
