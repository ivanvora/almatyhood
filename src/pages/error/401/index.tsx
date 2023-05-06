import React from 'react';
import { useRouter } from 'next/router';

import { Typography } from 'antd';

import { PageError } from '@/components/common/page-error';

export default function Custom401() {
    const router = useRouter();

    return (
        <PageError
            code={401}
            title='Мы Вас не знаем'
            text='Надо сначала войти в систему через главную страницу, используя логин и пароль.'
            content={<Typography.Link onClick={() => router.push('/')}>Войти</Typography.Link>}
        />
    );
}
