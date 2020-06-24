import { put, takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
const SQLite = require('react-native-sqlite-storage');

const DB_NAME = 'tally_counter';
const TABLE_NAME = 'statistics_counters';
const FIELDS = [
  ['id', 'TEXT'],
  ['value', 'INTEGER'],
  ['date', 'INTEGER'], // unix time
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
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_INITIALIZE_FAIL, error });
  }
}

function* onIncrement({ id, value, step, date }) {
  const values = [id, value + step, date].join(',');
  const query = `INSERT INTO ${TABLE_NAME} (id, value, date) VALUES (${values});`;
  try {
    const payload = yield call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS, payload });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onDecrement({ id, value, step, date }) {
  const values = [id, value - step, date].join(',');
  const query = `INSERT INTO ${TABLE_NAME} (id, value, date) VALUES (${values});`;
  try {
    const payload = yield call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS, payload });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onUpdate({ id, date, fields }) {
  const updateStorage = Object.keys(fields).includes('value');
  if (!updateStorage) {
    return;
  }

  const meaningfulFields = { value: fields.value };
  const update = Object.entries(meaningfulFields)
    .map((key, value) => `${key}=${value}`)
    .join(',');
  const query = `UPDATE ${TABLE_NAME} SET ${update} WHERE id=${id};`;
  try {
    const payload = yield call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS, payload });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onCreate({ initialValue: { id, value, date } }) {
  const values = [id, value, date].join(',');
  const query = `INSERT INTO ${TABLE_NAME} (id, value, date) VALUES (${values});`;
  try {
    const payload = yield call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS, payload });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onRemove({ id }) {
  const query = `DELETE FROM ${TABLE_NAME} WHERE id=${id}`;
  try {
    const payload = yield call(() => storage.executeSql(query));
    yield put({ type: actionTypes.STATISTICS_WRITE_SUCCESS, payload });
  } catch (error) {
    yield put({ type: actionTypes.STATISTICS_WRITE_FAIL, error });
  }
}

function* onRead({ id, scale }) {
  const queryDate = `SELECT
    id,
    value,
    date
  FROM ${TABLE_NAME} WHERE id=${id} ORDER BY date`;
  const dailyLatestDatetimes = `
    SELECT
      id,
      strftime('%Y-%m-%d', datetime(date / 1000, 'unixepoch')) AS day,
      MAX(date) as date
    FROM ${TABLE_NAME} WHERE id=${id} GROUP BY day
  `;

  const queryGroupedByDay = `
    SELECT a.id, a.value, b.date, b.day
    FROM ${TABLE_NAME} a
    INNER JOIN (${dailyLatestDatetimes}) b ON a.id = b.id AND a.date = b.date
  `;

  const hourlyLatestDatetimes = `
    SELECT
      id,
      strftime('%Y-%m-%d %H:00', datetime(date / 1000, 'unixepoch')) AS hour,
      MAX(date) as date
    FROM ${TABLE_NAME} WHERE id=${id} GROUP BY hour
  `;
  const queryGroupedByHour = `
    SELECT a.id, a.value, b.date, b.hour
    FROM ${TABLE_NAME} a
    INNER JOIN (${hourlyLatestDatetimes}) b ON a.id = b.id AND a.date = b.date
  `;

  try {
    const data = [
      yield call(() => storage.executeSql(queryDate)),
      yield call(() => storage.executeSql(queryGroupedByHour)),
      yield call(() => storage.executeSql(queryGroupedByDay)),
    ];
    const payload = data.map(record => record[0].rows.raw());
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
