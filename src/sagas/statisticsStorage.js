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

function* execute(query, successAction, failAction, storage) {
  try {
    const payload = yield call(() => storage.executeSql(query));
    yield put({ type: successAction, payload });
  } catch (error) {
    yield put({ type: failAction, error });
  }
}

function* read(query) {
  yield execute(
    query,
    actionTypes.STATISTICS_READ_SUCCESS,
    actionTypes.STATISTICS_READ_FAIL,
    storage,
  );
}

function* write(query) {
  yield execute(
    query,
    actionTypes.STATISTICS_WRITE_SUCCESS,
    actionTypes.STATISTICS_WRITE_FAIL,
    storage,
  );
}

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
  yield write(query);
}

function* onDecrement({ id, value, step, date }) {
  const values = [id, value - step, date].join(',');
  const query = `INSERT INTO ${TABLE_NAME} (id, value, date) VALUES (${values});`;
  yield write(query);
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
  yield write(query);
}

function* onCreate({ initialValue: { id, value, date } }) {
  const values = [id, value, date].join(',');
  const query = `INSERT INTO ${TABLE_NAME} (id, value, date) VALUES (${values});`;
  yield write(query);
}

function* onRemove({ id }) {
  const query = `DELETE FROM ${TABLE_NAME} WHERE id=${id}`;
  yield write(query);
}

function* onRead({ id, window: [start, end] }) {
  const queryDate = `
    SELECT id, value, date
    FROM ${TABLE_NAME}
    WHERE id=${id} AND date >= ${start} AND date <= ${end}
    ORDER BY date
  `;

  try {
    const tableData = yield call(() => storage.executeSql(queryDate));
    const payload = tableData[0].rows.raw();
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
