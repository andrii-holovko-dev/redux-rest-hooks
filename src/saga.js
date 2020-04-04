import {fork, cancel, take, call, put} from 'redux-saga/effects'

const getTaskId = (meta) => `${meta.operation}_${meta.entityType}_${meta.queryParams.id}_${meta.queryParams.index}_${meta.queryParams.size}`;

export default entitySagas => function*() {
  yield fork(function*() {
    let lastTasks = {};
    while (true) {
      const action = yield take((action) => action.type.startsWith('@RRH_INIT_'));
      const taskId = getTaskId(action.meta);
      if (lastTasks[taskId]) {
        yield cancel(lastTasks[taskId]);
      }
      lastTasks[taskId] = yield fork((function* ({ meta: { entityType, operation, queryParams }}) {
        try {
          const data = yield call(entitySagas[entityType][operation], queryParams);
          yield put({
            type: `@RRH_${operation}_${entityType}_SUCCESS`.toUpperCase(),
            payload: data,
            meta: {
              operation: `${operation}_success`,
              entityType,
              queryParams,
            }
          });
        } catch (error) {
          yield put({
            type: `@RRH_${operation}_${entityType}_FAILURE`.toUpperCase(),
            payload: error,
            meta: {
              operation: `${operation}_failure`,
              entityType,
              queryParams,
            }
          });
        }
      }), action);
    }
  });
};
