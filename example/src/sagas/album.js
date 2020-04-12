import {call} from 'redux-saga/effects'
import {fetchJSON} from 'redux-rest-hooks';

export const get = function* ({id}) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/${id}`);
};

export const getList = function* ({id, index, size}) {
  const data = yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums?_start=${index}&_limit=${size}`);
  return { data, size: 100 }; // usually total size must be returned by backend
};

export const create = function* (payload) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/`, { method: 'POST', body: payload });
};

export const put = function* (payload) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/`, { method: 'PUT', body: payload });
};

export const patch = function* (payload) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/`, { method: 'PATCH', body: payload });
};

export const remove = function* ({ id }) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/${id}`, { method: 'DELETE' });
};
