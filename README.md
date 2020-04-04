# redux-rest-hooks

> Declarative data fetching library

[![NPM](https://img.shields.io/npm/v/redux-rest-hooks.svg)](https://www.npmjs.com/package/redux-rest-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save redux-rest-hooks
```

## Usage

```jxs harmony
const Album = ({id}) => {
  const {create, isCreating, data, createError} = useCreateEntity('album');
  return <>
    <button onClick={create}>Create</div>
    <div>{isCreating ? 'Creating...' : JSON.stringify(data)}</div>
    <div>{JSON.stringify(createError)}</div>
  </>;
});
```

## License

MIT © [andrii-holovko](https://github.com/andrii-holovko)
