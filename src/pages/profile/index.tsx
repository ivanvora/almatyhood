import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ProfilePage } from '@/components/pages/profile';

const Profile: NextPage = () => <ProfilePage />;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['profile'])),
    },
});

export default Profile;
