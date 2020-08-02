import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {CURSOR_INIT} from 'api/Cursors';
import commonCursorReducers from 'store/domains/cursor/cursorReducers';

const persistConfig = {
  key: 'results',
  storage: AsyncStorage,
};

const initState = {
  results: [],
  cursor: {
    ...CURSOR_INIT,
  },
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case 'RESULTS_FETCHED':
      return {
        ...state,
        results: action.results,
        cursor: {
          ...action.cursor,
          loading: false,
        },
      };
    default:
      return commonCursorReducers('RESULTS', state, action);
  }
};

export default persistReducer(persistConfig, reducers);
