# Redux REST Hooks

> Redux REST Hooks is a set of tools for communication with REST APIs in React frontends. Declaratively fetch data from API and store it in Redux.


[![NPM](https://img.shields.io/npm/v/redux-rest-hooks.svg)](https://www.npmjs.com/package/redux-rest-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-rest-hooks
```

## Motivation

- all fetched data should be persisted in redux store for the duration of application session
- never refetch data from API that has been already persisted in the application state unless **refetch()** gets called or **autoFetch===false**
- support tools for **post, put, patch** and **delete** data, manage loading state, error state and update store with successful response
- support **pagination** and resolve **concurrency** issues
- provide simple and consistent Redux store structure and hooks API

## Usage

For brevity, we'll just show the simplest workable pieces of code.

### 1. Declarative fetching of user by ID:

```javascript
import React from 'react';
import { useEntity } from 'redux-rest-hooks';

const UserView = ({id}) => {
  const { data, isLoading } = useEntity('user', {id});
  return <div>{isLoading ? 'Loading...' : JSON.stringify(data)}</div>;
};

export default UserView;
```

#### 2. Declarative fetching of full users list:
```javascript
import React from 'react';
import { useEntityList } from 'redux-rest-hooks';

const UserListFull = () => {
  const {data: users, refetch, isLoadingList, getListError} = useEntityList('user');
  return <>
    { isLoadingList ? <div>Loading...</div> :
       users.map(user => <div key={user.id}>{user.name}</div>) }
    <button onClick={refetch}>Refetch page</button>
  </>;
};

export default UserListFull;
```

#### 3. Declarative fetching with pagination:

```javascript
import React from 'react';
import { useEntityList } from 'redux-rest-hooks';

const UserListPagination = () => {
  const [index, setIndex] = useState(0);
  const {data: users, refetch, isLoadingList, getListError} = useEntityList('user', { index, size: 10 });

  return <>
    { index > 0 && <button onClick={() => setIndex(index - 10)}>Prev Page</button> }
    <button onClick={() => setIndex(index + 10)}>Next Page</button>
    { isLoadingList ? <div>Loading...</div> :
       users.map(user => <div key={user.id}>{user.name}</div>) }
    <button onClick={refetch}>Refetch page</button>
  </>;
};

export default UserListPagination;
```

#### 4. Suppose we have a UI to post some user on a remote server:

```javascript
import React from 'react';
import { useCreateEntity } from 'redux-rest-hooks';

const CreateUser = () => {
  const {create, isCreating, data, createError} = useCreateEntity('album');
  return <>
    <button onClick={() => create({ title: 'Demo album' })}>Create</button>
    <div>{isCreating ? 'Creating...' : JSON.stringify(data)}</div>
    <div>{JSON.stringify(createError)}</div>
  </>;
};

export default CreateUser;
```

#### 5. In order to make previous examples workable define asynchronous logic (api calls) using redux-saga generators:
Supported generator names are: **get, getList, create, put, patch, remove**

```javascript
import { call } from 'redux-saga/effects'
import { fetchJSON } from 'redux-rest-hooks';

export const get = function* ({ id }) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/users/${id}`);
};

export const getList = function* () {
  const data = yield call(fetchJSON, `https://jsonplaceholder.typicode.com/users`);
  return { data };
};

export const create = function* (payload) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/users/`, { method: 'POST', body: payload });
};
```

**IMPORTANT:** The functions you distruct from **useEntity, useEntityList, useCreateEntity** have names equal to generator names.

The first argument you pass to the hook is what you receive in appropriate generator so you can pass any variables you need.

The library automatically resolves concurrency issues using algorithm similar to **takeLatest** so most of the time you don't have to manage concurrency by yourself. For more advanced tuning you are free to use any redux-saga tools.


#### 6. In order to integrate these generators to your applications you have to create root saga using makeRootSaga utility function:
```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {makeRootSaga} from 'redux-rest-hooks';
import * as user from './sagas/user';

import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(makeRootSaga({ user }));
``` 

#### 7. If your project already has root saga then you have to fork makeRootSaga call:
```javascript
import {makeRootSaga} from 'redux-rest-hooks';
import * as user from './sagas/user';

function* yourRootSaga() {
  fork(makeRootSaga({ user }))
  /// ...your code
}
```

#### 8. Use imported dataReducer to allow the library manage redux store:
```javascript
import {combineReducers} from "redux";
import {dataReducer} from "redux-rest-hooks";

export default combineReducers({
  data: dataReducer,
  // your reducers
});
```

## Advanced usage

**useEntityActions** is utility hook which allows to call API for any entity ID or refetch part of list or full list

Allows you to do advanced tuning of data updates in your application

```javascript
    const user = useEntityActions('user');
    user.get({ id: 10, ...customParams });
    user.getList(customParams);
    user.getList({ index: 50, size: 10, ...customParams });
    user.create(customPayload);
    user.put({ id: 55, customPayload });
    user.patch({ id: 55, customPayload });
    user.remove({ id: 55 });
```

**IMPORTANT:** If only **index** param is provided than library expects that all the items starting from this index will be returned by generator.

## License

MIT © [andrii-holovko-dev](https://github.com/andrii-holovko-dev)
