import React from 'react';

import { PageError } from '@/components/common/page-error';

export default function Custom404() {
    return <PageError code={404} text='Ой ... Пусто' />;
}
