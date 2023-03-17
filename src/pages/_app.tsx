import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';

import { ConfigProvider } from 'antd';

import { purpletheme, theme } from '@/modules/configs/ant';

import '../styles/global.css';
// антовские локали работают в связке с локалями dayjs
// по другому в календаре пропадают имена месяцов
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isBlack = router.route === '/';

    return (
        <ConfigProvider theme={isBlack ? theme : purpletheme}>
            <Head>
                <title>AlmatyHood</title>
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/leaflet@1.9.3/dist/leaflet.css'
                    integrity='sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI='
                    crossOrigin=''
                />
            </Head>
            <Component {...pageProps} />
        </ConfigProvider>
    );
}

export default appWithTranslation(MyApp);
