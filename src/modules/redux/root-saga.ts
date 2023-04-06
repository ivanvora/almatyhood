import { all } from 'redux-saga/effects';
import { getLikesSaga } from './likes/saga';

export default function* rootSaga() {
    yield all([getLikesSaga()]);
}
