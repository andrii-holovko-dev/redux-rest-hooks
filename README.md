# redux-rest-hooks

> Declarative REST API fetching using React Hooks and Redux

[![NPM](https://img.shields.io/npm/v/redux-rest-hooks.svg)](https://www.npmjs.com/package/redux-rest-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-rest-hooks
```

## Usage

Suppose we have a UI to post some album data on a remote server when "Create" button is clicked.
 (For brevity, we'll just show the simplest workable piece of code.)

1. Create a component:

```javascript
import React from 'react';
import { useCreateEntity } from 'redux-rest-hooks';

const CreateAlbum = ({id}) => {
  const {create, isCreating, data, createError} = useCreateEntity('album');
  return <>
    <button onClick={() => create({ title: 'Demo album' })}>Create</button>
    <div>{isCreating ? 'Creating...' : JSON.stringify(data)}</div>
    <div>{JSON.stringify(createError)}</div>
  </>;
};

export default CreateAlbum;
```

2. Define any asynchronous logic you need to make a request using redux-saga generator:

```javascript
export const create = function* (payload) {
  return yield call(fetchJSON, `https://jsonplaceholder.typicode.com/albums/`, { method: 'POST', body: payload });
};
```

3. To allow the library use such generators we'll have to create our root saga using makeRootSaga utility function:
```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {makeRootSaga} from 'redux-rest-hooks';

import reducer from './reducers'
import album from './albumSagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(makeRootSaga({ album }));
``` 

4. If your project already uses redux-saga then you have to fork makeRootSaga call:
```javascript
    function* yourRootSaga() {
      fork(makeRootSaga({ album }))
      /// ...your code
    }
```

5. Use imported dataReducer to allow the library manage redux store.
```javascript
import {combineReducers} from "redux";
import {dataReducer} from "redux-rest-hooks";

export default combineReducers({
  data: dataReducer,
  // your reducers
});
```

## License

MIT © [andrii-holovko-dev](https://github.com/andrii-holovko-dev)
