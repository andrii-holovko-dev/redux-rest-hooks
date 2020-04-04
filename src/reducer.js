import {omit, get} from 'lodash';

const defaultStates = {
  isLoading: false,
  isPutting: false,
  isPatching: false,
  isRemoving: false,
  isCreating: false,
  getError: null,
  putError: null,
  patchError: null,
  removeError: null,
  createError: null,
};

const pureOperation = operation =>
  operation
    .replace('_failure', '')
    .replace('_success', '');

const getPendingKey = operation => {
  return ({
    get: 'isLoading',
    create: 'isCreating',
    put: 'isPutting',
    patch: 'isPatching',
    remove: 'isRemoving',
  })[pureOperation(operation)]
};

const getErrorKey = operation => {
  return `${pureOperation(operation)}Error`;
};


export default (state={}, {payload, meta = {}}) => {

  const entity = get(state, meta.entityType, {});
  const data = get(entity, 'data', {});
  const entityById = data[get(meta, 'queryParams.id')] || {};

  switch (meta.operation) {
    case 'create_success':
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          data: {
            ...get(state[meta.entityType], 'data', {}),
            [payload.id]: {
              ...defaultStates,
              data: payload,
            },
            [meta.queryParams.id]: {
              ...defaultStates,
              data: payload,
            }
          }
        }
      };
    case 'get':
    case 'put':
    case 'patch':
    case 'remove':
    case 'create':
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          data: {
            ...data,
            [meta.queryParams.id]: {
              ...entityById,
              [getPendingKey(meta.operation)]: true,
              [getErrorKey(meta.operation)]: null,
            }
          }
        }
      };
    case 'get_failure':
    case 'put_failure':
    case 'patch_failure':
    case 'remove_failure':
    case 'create_failure':
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          data: {
            ...data,
            [meta.queryParams.id]: {
              ...entityById,
              [getPendingKey(meta.operation)]: false,
              [getErrorKey(meta.operation)]: payload,
            }
          }
        }
      };
    case 'get_success':
    case 'put_success':
    case 'patch_success':
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          data: {
            ...data,
            [meta.queryParams.id]: {
              ...entityById,
              [getPendingKey(meta.operation)]: false,
              [getErrorKey(meta.operation)]: null,
              data: payload,
            }
          }
        }
      };
    case 'remove_success':
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          data: omit(get(state[meta.entityType], 'data', {}), meta.queryParams.id),
        }
      };
    case 'getList':
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          isLoadingList: true,
          getListError: null,
        }
      };
    case 'getList_failure':
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          isLoadingList: false,
          getListError: payload,
        }
      };
    case 'getList_success':
      const payloadList = payload.data;

      const requestIndex = meta.queryParams.index || 0;
      const responseSize = (meta.queryParams.size || payloadList.length);
      const existingList = get(state[meta.entityType], 'list', []);

      const isInfiniteLoaded = get(state[meta.entityType], 'isInfiniteLoaded', {});
      return {
        ...state,
        [meta.entityType]: {
          ...entity,
          isLoadingList: false,
          getListError: null,
          listResponse: omit(payload, 'data'),
          isInfiniteLoaded: meta.queryParams.size ? isInfiniteLoaded : {
            ...isInfiniteLoaded,
            [requestIndex]: true,
          },
          list: (new Array(Math.max(requestIndex + responseSize, existingList.length)))
              .fill(null)
              .map(
                (item, index) => ((index < requestIndex) || (index > (requestIndex + responseSize))) ?
                  existingList[index] : (payloadList[index - requestIndex] || { id: null }).id
              ),
          data: {
            ...get(state[meta.entityType], 'data', {}),
            ...payloadList
              .map((item) => ({ ...defaultStates, data: item }))
                .reduce((obj, item) => {
                  obj[item.data.id] = item;
                  return obj;
                }, {})
          }
        }
      };
    default:
      return state;
  }
};