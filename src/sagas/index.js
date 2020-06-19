import { all, spawn, call } from 'redux-saga/effects';
import statisticsStorageSaga from './statisticsStorage';

function* rootSaga() {
  const sagas = [statisticsStorageSaga];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
