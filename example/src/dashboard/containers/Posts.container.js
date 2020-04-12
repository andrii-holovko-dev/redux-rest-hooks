import React from 'react';

import {useEntityList} from "redux-rest-hooks";
import EntityList from "../components/EntityList";

const PostsContainer = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {data, listResponse = {}, isLoadingList} = useEntityList('post', {index: page * rowsPerPage, size: rowsPerPage});

  return <EntityList
    list={data}
    page={page}
    setPage={setPage}
    rowsPerPage={rowsPerPage}
    setRowsPerPage={setRowsPerPage}
    size={listResponse.size}
    isLoading={isLoadingList}
  />
};

export default PostsContainer;
