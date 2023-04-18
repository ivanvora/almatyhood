import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { DetailsPage } from '@/components/pages/details';

const Details: NextPage = () => <DetailsPage />;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['details'])),
    },
});

export default Details;
