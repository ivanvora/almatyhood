import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Main as MainPage } from '@/components/pages/main';

const Main: NextPage = () => <MainPage />;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['main'])),
    },
});

export default Main;
