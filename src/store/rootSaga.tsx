import {ADD_NEW_TASK, DELETE_TASK} from './types';
import {take, put} from 'redux-saga/effects';

export function* handleAddTask(data) {
  console.log(data);
  yield put({type: ADD_NEW_TASK, data});
}

export function* handleDeleteTask(data) {
  yield put({type: DELETE_TASK, data});
}

export function* watchClickSaga() {
  yield;
}

// export function* workerSaga() {
//   yield take(ADD_NEW_TASK);
//   yield take(DELETE_TASK);
// }

export default function* rootSaga() {
  yield handleDeleteTask;
  yield handleAddTask;
}
