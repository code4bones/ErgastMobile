import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {CURSOR_INIT} from 'api/Cursors';
import commonCursorReducers from 'store/domains/cursor/cursorReducers';

const persistConfig = {
  key: 'seasons',
  storage: AsyncStorage,
};

const initState = {
  seasons: [],
  cursor: {
    ...CURSOR_INIT,
  },
};

const seasonsReducers = (state = initState, action) => {
  switch (action.type) {
    case 'SEASONS_FETCHED':
      return {
        ...state,
        seasons: action.seasons,
        cursor: {
          ...action.cursor,
          loading: false,
        },
      };
    default:
      return commonCursorReducers('SEASONS', state, action);
  }
};

export default persistReducer(persistConfig, seasonsReducers);
