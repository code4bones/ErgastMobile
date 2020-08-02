import {SeasonDetails} from 'api/Cursors';
import commonCursorActions from 'store/domains/cursor/cursorActions';

const detailsForSeason = (season) => {
  return async (dispatch, getState) => {
    const {cursor} = getState().seasonDetailsReducers;
    // pass it to state for navigation ( over overloaded fetch )
    const seasonDetails = new SeasonDetails(season.season);
    const res = await seasonDetails.move(cursor.page);
    if (res.error)
      return dispatch({
        type: 'CURSOR_ERROR',
        message: `Ошибка получения данных ${res.error}`,
        info: {
          actionName: 'detailsForSeason',
          reducersName: 'seasonDetailsReducers',
          cursorName: 'seasonDetails',
        },
      });

    const details = [
      {
        title: season.season,
        data: res.items,
      },
    ];
    dispatch({
      type: 'SEASON_DETAILS_FETCHED',
      details,
      cursor: {...res.cursor, page: 0},
      seasonDetails,
      season,
    });
  };
};

// OVERLOAD of default fetch in commonCursorActions
const fetch = () => {
  return async (dispatch, getState) => {
    const {seasonDetails, cursor, season} = getState().seasonDetailsReducers;

    const res = await seasonDetails.move(cursor.page);
    if (res.error)
      return dispatch({
        type: 'CURSOR_ERROR',
        message: `Ошибка получения данных ${res.error}`,
        info: {
          actionName: 'fetch',
          reducersName: 'seasonDetailsReducers',
          cursorName: 'seasonDetails',
        },
      });

    const details = [
      {
        title: season.season,
        data: res.items,
      },
    ];
    dispatch({
      type: 'SEASON_DETAILS_FETCHED',
      details,
      cursor: res.cursor,
      seasonDetails,
      season,
    });
  };
};

export default commonCursorActions(
  {
    actionName: 'SEASON_DETAILS',
    reducersName: 'seasonDetailsReducers',
    cursorName: 'details',
  },
  {
    detailsForSeason,
    fetch,
  },
);
