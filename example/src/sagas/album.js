import {call, delay} from 'redux-saga/effects'
import {fetchJSON} from 'redux-rest-hooks';

export const get = function* ({id}) {
  yield delay(5000);
  return { demo: 123, id };
};


export const getList = function* ({id}) {
  const data = yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/`);
  return { data, size: 1000 };
};



export const create = function* (payload) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/`, { method: 'POST', body: payload });
};

export const put = ({id}) => fetchJSON(`https://jsonplaceholder.typicode.com/albums/${id}`);
export const patch = ({id}) => fetchJSON(`https://jsonplaceholder.typicode.com/albums/${id}`);
export const remove = ({id}) => fetchJSON(`https://jsonplaceholder.typicode.com/albums/${id}`);
