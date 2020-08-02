import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import commonCursorReducers from 'store/domains/cursor/cursorReducers';
import {CURSOR_INIT} from 'api/Cursors';

const persistConfig = {
  key: 'seasonDetails',
  storage: AsyncStorage,
  blacklist: ['seasonDetails'],
};

const initState = {
  details: [
    {
      title: 'загрузка...',
      data: [],
    },
  ],
  cursor: {
    ...CURSOR_INIT,
  },
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case 'SEASON_DETAILS_FETCHED':
      return {
        ...state,
        details: action.details,
        seasonDetails: action.seasonDetails,
        season: action.season,
        cursor: {
          ...action.cursor,
          loading: false,
        },
      };
    default:
      return commonCursorReducers('SEASON_DETAILS', state, action);
  }
};

export default persistReducer(persistConfig, reducers);
