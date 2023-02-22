import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Auth as AuthPage } from '@/components/pages/auth';

const Auth: NextPage = () => <AuthPage />;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['auth'])),
    },
});

export default Auth;
