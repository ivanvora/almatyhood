import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';

import { ConfigProvider } from 'antd';

import { purpletheme, theme } from '@/modules/configs/ant';
import { store } from '@/modules/redux';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isBlack = router.route === '/';

    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default appWithTranslation(MyApp);
