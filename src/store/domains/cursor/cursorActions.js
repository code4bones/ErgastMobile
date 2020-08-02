/* eslint-disable no-undef */
import {Cursors} from 'api/Cursors';

export default commonCursorActions = (
  {actionName, reducersName, cursorName, transformCursor},
  others = {},
) => {
  const actions = {
    fetch: () => {
      return async (dispatch, getState) => {
        const {cursor} = getState()[reducersName];
        const res = await Cursors[cursorName].move(cursor.page);
        if (res.error)
          return dispatch({
            type: 'CURSOR_ERROR',
            message: `Ошибка получения данных ${res.error}`,
            info: {actionName, reducersName, cursorName},
          });

        let items = res.items;
        if (transformCursor && typeof transformCursor === 'function')
          items = transformCursor(res.items);

        dispatch({
          type: `${actionName}_FETCHED`,
          [cursorName]: items,
          cursor: res.cursor,
        });
      };
    },

    move: (direction) => {
      return async (dispatch, getState) => {
        const {cursor} = getState()[reducersName];
        return dispatch({
          type: `${actionName}_MOVE`,
          page: cursor.page + direction,
          loading: true,
        });
      };
    },

    setPage: (pageNum) => ({type: `${actionName}_SETPAGE`, page: pageNum}),

    reset: () => {
      return async (dispatch, getState) => {
        Promise.all([dispatch(actions.setPage(0)), dispatch(actions.fetch())]);
      };
    },

    navigate: (direction) => {
      return async (dispatch, getState) => {
        Promise.all([
          dispatch(actions.move(direction)),
          dispatch(actions.fetch()),
        ]);
      };
    },

    // add others actions ( selectSeasons, etc... )
    ...others,
  };
  return actions;
};
