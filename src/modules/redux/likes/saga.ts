import { call, put, takeEvery } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { client } from '@/modules/api';
import { TBuilding } from '@/modules/models/common';

import { Fetching, FetchingError, FetchingSuccess, TAction } from './reducer';

export const GET_LIKES = createAction<number>('GET_LIKES');

export function* getLikes({ payload }: TAction<number>) {
    try {
        yield put(Fetching());

        const d: AxiosResponse<TBuilding[]> = yield call(client.common.getLikes, payload);

        if (d.status === 200 && d.data) {
            yield put(FetchingSuccess(d.data));
        }
    } catch (error) {
        yield put(FetchingError((error as Error).message ?? ''));
        console.log('error', error);
    }
}

export function* getLikesSaga() {
    yield takeEvery(GET_LIKES.type, getLikes);
}
