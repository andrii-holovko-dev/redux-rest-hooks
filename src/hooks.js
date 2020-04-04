import {useEffect, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  makeStoredDataByIdSelector,
  makeStoredDataListSelector,
} from './selectors';

const createAction = (operation, entityType, queryParams) => ({
  type: `@RRH_INIT_${operation}_${entityType}`.toUpperCase(),
  meta: {
    operation,
    entityType,
    queryParams,
  },
});

export const useEntity = (type, queryParams = {}, autoFetch = true) => {
  const dispatch = useDispatch();
  const updatedParams = queryParams.id ? queryParams : { ...queryParams, id: '@RRH_SINGLE' };

  const selectStoredDataById = useMemo(
    () => makeStoredDataByIdSelector(type, updatedParams.id),
    [type, updatedParams.id]
  );

  const storedDataById = useSelector(selectStoredDataById);

  useEffect(() => {
    if (!storedDataById && autoFetch) {
      dispatch(createAction('get', type, updatedParams));
    }
  }, [storedDataById, autoFetch, dispatch]);

  return {
    ...storedDataById,
    refetch: () => dispatch(createAction('get', type, updatedParams)),
    patch: () => dispatch(createAction('patch', type, updatedParams)),
    put: () => dispatch(createAction('put', type, updatedParams)),
    remove: () => dispatch(createAction('remove', type, updatedParams)),
  };
};

export const useCreateEntity = (type, queryParams = {}) => {
  const dispatch = useDispatch();

  const id = useMemo(
    () => `@RRH_CREATION_ID_${new Date().getTime()}`,
    [type],
  );

  const updatedParams = { ...queryParams, id };

  const selectStoredDataById = useMemo(
    () => makeStoredDataByIdSelector(type, updatedParams.id),
    [type, updatedParams.id]
  );

  const storedDataById = useSelector(selectStoredDataById);

  return {
    ...storedDataById,
    create: () => dispatch(createAction('create', type, updatedParams)),
  };
};

export const useEntityList = (type, queryParams = {}, autoFetch = true) => {
  const dispatch = useDispatch();

  const selectStoredDataListByType = useMemo(
    () => makeStoredDataListSelector(type, queryParams.index, queryParams.size),
    [type, queryParams.index, queryParams.size]
  );

  const storedDataList = useSelector(selectStoredDataListByType);

  useEffect(() => {
    if (!storedDataList.isListLoaded && autoFetch) {
      dispatch(createAction('getList', type, queryParams));
    }
  }, [storedDataList.isListLoaded, autoFetch, dispatch]);

  return {
    data: storedDataList.data,
    listResponse: storedDataList.listResponse,
    isLoadingList: storedDataList.isLoadingList,
    refetch: () => dispatch(createAction('getList', type, queryParams)),
  }
};

export const useEntityActions = (type) => {
  const dispatch = useDispatch();
  const get = useCallback(
    (queryParams = {}) => dispatch(createAction('get', type, queryParams)),
    [dispatch, type]
  );
  const getList = useCallback(
    (queryParams = {}) => dispatch(createAction('getList', type, queryParams)),
    [dispatch, type]
  );
  const create = useCallback(
    (queryParams = {})  => dispatch(createAction('create', type, queryParams)),
    [dispatch, type]
  );
  const put = useCallback(
    (queryParams = {}) => dispatch(createAction('put', type, queryParams)),
    [dispatch, type]
  );
  const patch = useCallback(
    (queryParams = {}) => dispatch(createAction('patch', type, queryParams)),
    [dispatch, type]
  );
  const remove = useCallback(
    (queryParams = {}) => dispatch(createAction('remove', type, queryParams))
    , [dispatch, type]
  );
  return {get, getList, create, put, patch, remove};
};
