import React, {useState} from 'react';
import { useEntity, useEntityList, useEntityActions, useCreateEntity } from "redux-rest-hooks";

const ItemView = ({id, itemType}) => {
  const {data, isLoading, refetch} = useEntity(itemType, { id});
  return isLoading ? <div>Loading...</div> : <div><div>{JSON.stringify(data)}</div><br /><button onClick={refetch}>Refetch</button></div>
};

const CommentsList = React.memo(() => {
  const test = useEntityList('comment', { size: 50 });
  const {getList} = useEntityActions('comment');

  //const test2 = useEntityList('comment', { index: 20, size: 10});
  return <><div>{JSON.stringify(test.data)}</div><button onClick={() => getList({ index: 20, size: 10})}>test</button></>;
});

const Album = React.memo(({id}) => {
  const {refetch, data} = useEntityList('album', );
  const {refetch: refetch2, data: data2, create} = useCreateEntity('album');
  return <div><button onClick={create}>create</button>{JSON.stringify(data)}</div>;
});


const User = React.memo(({ id }) => {
  const { data, isLoading } = useEntity('user', {id});
  return <div>{JSON.stringify(test.data)}</div>;
});

const Pagination = React.memo(() => {
  const [index, setIndex] = useState(0);
  const {data} = useEntityList('album', { index, size: 2, test: index});


  //const test2 = useEntityList('comment', { index: 20, size: 10});
  return <><div>{JSON.stringify(data)}</div>
    <button onClick={() => setIndex(index - 2)}>Prev</button>
    <button onClick={() => setIndex(index + 2)}>Next</button>
  </>;
});



function App() {
  const [itemId, setItemId] = useState();
  const [itemType, setItemType] = useState('album');
  const {create: leaveComment, fetchList: fetchComments} = useEntityActions('comment');
  return <>
    <Album id={1}/>
    <Album id={2}/>
    </>;

  return (
    <div className="App">
      <select value={itemType} onChange={event => setItemType(event.target.value)}>
        <option value="album">album</option>
        <option value="comment">comment</option>
        <option value="user">user</option>
      </select>
      <button onClick={() => leaveComment({ text: 'demo'})}>leave comment</button>
      <button onClick={() => fetchComments({ index: 0, size: 20 })}>get all comments 1</button>
      <button onClick={() => fetchComments({ index: 20, size: 20 })}>get all comments 2</button>

      <button onClick={() => fetchComments({ index: 40, size: 20 })}>get all comments 3</button>
      <button onClick={() => fetchComments({ index: 60 })}>get all comments 3</button>
      <input onChange={event => setItemId(event.target.value)} />
      {itemId && <ItemView id={itemId} itemType={itemType} />}
      <CommentsList />
      {/*<Album1/>
      <Album2/>*/}
    </div>
  );
}

export default App;
