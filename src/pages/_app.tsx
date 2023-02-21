
import React from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';



// антовские локали работают в связке с локалями dayjs
// по другому в календаре пропадают имена месяцов


type TLocale = 'ru'|'kk';

function MyApp({ Component, pageProps }: AppProps) {
   
    return (
    <>
                    <Head>
                        <title>AlmatyHood</title>
                      
                    </Head>
                    <Component {...pageProps} /></>
          
    );
}

export default appWithTranslation(MyApp);
