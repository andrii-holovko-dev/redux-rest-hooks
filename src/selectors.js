import {get} from 'lodash';
import {createSelector} from "reselect";

export const makeStoredDataSingleSelector = (type) => {
  return createSelector(
    (state) => get(state.data[type], `data.@RRH_SIGNLE`),
    (data) => data,
  );
};

export const makeStoredDataByIdSelector = (type, id) => {
  return createSelector(
    (state) => get(state.data[type], `data[${id}]`),
    (data) => data,
  );
};

export const makeStoredDataListSelector = (type, index = 0, size = 0 ) => {
  return createSelector(
    (state) => state.data[type],
    (data) => {
      const loadedArray = get(data, 'list', new Array(index + size).fill(undefined));
      const isLimitedLoaded = (loadedArray.length >= (index + size)) && loadedArray.slice(index, index + size).every(item => item !== undefined);
      const isInfiniteLoaded = get(data, 'isInfiniteLoaded', {})[index];
      return {
        data: get(data, 'list', [])
          .slice(index, (size ? index + size : undefined))
          .map(item => get(data, `data[${item}].data`))
          .filter(item => item),
        isListLoaded: size ? isLimitedLoaded : isInfiniteLoaded,
        isLoadingList: get(data, 'isLoadingList'),
        listResponse: get(data, 'listResponse', {}),
      };
    },
  );
};
