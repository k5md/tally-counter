import { put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
const SQLite = require('react-native-sqlite-storage');

const DB_NAME = 'tally_counter';
const TABLE_NAME = 'statistics_counters';
const FIELDS = [
  ['id', 'TEXT'],
  ['value', 'INTEGER'],
  ['date', 'TEXT'], // YYYY-MM-DD HH:MM:SS
];

let storage = null;
SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

function* initialize() {
  try {
    storage = yield call(() => SQLite.openDatabase({ name: DB_NAME }));
    const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(${FIELDS.map(entry =>
      entry.join(' '),
    ).join(',')});`;
    yield call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_INITIALIZE_SUCCESS });
  } catch (e) {
    yield put({ type: actionTypes.STATISTICS_INITIALIZE_FAIL, message: e });
  }
}

function* onIncrement({ id }) {
  const query = `UPDATE ${TABLE_NAME} SET value = value + 1 WHERE id=${id}`;
  try {
    call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onDecrement({ id }) {
  const query = `UPDATE ${TABLE_NAME} SET value = value - 1 WHERE id=${id}`;
  try {
    call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onUpdate({ id, fields }) {
  const update = Object.entries(fields)
    .map((key, value) => `${key}=${value}`)
    .join(',');
  const query = `UPDATE ${TABLE_NAME} SET ${update} WHERE id=${id}`;
  try {
    call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onCreate({ id, value, date }) {
  const values = [id, value, date].join(',');
  const query = `INSERT INTO ${TABLE_NAME} (id, value, date) VALUES (${values})`;
  try {
    call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onRemove({ id }) {
  const query = `DELETE FROM ${TABLE_NAME} WHERE id=${id}`;
  try {
    call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onRead({ id }) {
  const query = `SELECT * FROM ${TABLE_NAME} ORDER BY date`;
  try {
    const payload = call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_READ_SUCCESS, payload });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_READ_FAIL, error });
  }
}

export default function* statisticsStorage() {
  yield call(initialize);

  yield takeEvery(actionTypes.COUNTER_CREATE, onCreate);
  yield takeEvery(actionTypes.COUNTER_DECREMENT, onDecrement);
  yield takeEvery(actionTypes.COUNTER_INCREMENT, onIncrement);
  yield takeEvery(actionTypes.COUNTER_UPDATE, onUpdate);
  yield takeEvery(actionTypes.COUNTER_REMOVE, onRemove);
  yield takeEvery(actionTypes.STATISTICS_READ, onRead);
}
