import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from "next/dynamic"

const MapPage = dynamic(() => import("@/components/pages/map"), { ssr:false })

const Map: NextPage = () => <MapPage  layers="gis_red_lines,gis_districts"/>;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? '', ['map'])),
    },
});

export default Map;
