import { put, takeEvery, call } from 'redux-saga/effects';
import { uniqueId } from 'lodash';
import { getPrevDay, getPrevMonth, getPrevYear } from '../utils';
import * as actionTypes from '../constants/actionTypes';
const SQLite = require('react-native-sqlite-storage');

const DB_NAME = 'tally_counter';
const TABLE_NAME = 'statistics_counters';
const FIELDS = [
  ['id', 'INTEGER'],
  ['value', 'INTEGER'],
  ['date', 'INTEGER'], // unix time
];

let storage = null;
SQLite.DEBUG(__DEV__);
SQLite.enablePromise(true);

const current = {
  get date() {
    return new Date();
  },
};

const selectableFrames = [
  { id: '1d', window: () => [getPrevDay(current.date), current.date.getTime()]},
  { id: '3d', window: () => [getPrevDay(current.date, 3), current.date.getTime()]},
  { id: 'M', window: () => [getPrevMonth(current.date), current.date.getTime()]},
  { id: 'Y', window: () => [getPrevYear(current.date), current.date.getTime()]},
  { id: 'All', window: () => [0, current.date.getTime()]},
];

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
    const table = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(${FIELDS.map(entry =>
      entry.join(' '),
    ).join(',')});`;
    const index = `
      CREATE INDEX IF NOT EXISTS id ON ${TABLE_NAME} id;
      CREATE INDEX IF NOT EXISTS id_value_date ON ${TABLE_NAME} (id, value, date);
    `;
    yield call(() => storage.executeSql(table));
    yield call(() => storage.executeSql(index));
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

function* onCreate({ initialValue: { value = 0, date = Date.now(), title = uniqueId() } }) {
  const values = [value, date].join(',');
  const query = `INSERT INTO ${TABLE_NAME} (value, date) VALUES (${values});`;

  try {
    const createdCounter = yield call(() => storage.executeSql(query));
    yield put({
      type: actionTypes.COUNTER_CREATE_SUCCESS,
      payload: { id: createdCounter[0].insertId, value, date, title },
    });
  } catch (error) {
    yield put({ type: actionTypes.COUNTER_CREATE_FAIL, error });
  }
}

function* onRemove({ id }) {
  const query = `DELETE FROM ${TABLE_NAME} WHERE id=${id}`;
  yield write(query);
}

function* onRead({ ids, selectedFrame }) {
  const [start, end] = selectableFrames.find(({ id }) => id === selectedFrame.id).window();

  const queryDate = `
    SELECT id, value, date
    FROM ${TABLE_NAME}
    WHERE id IN (${ids.map(item => item.id).join(',')}) AND date >= ${start} AND date <= ${end}
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
