import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';
import {CURSOR_INIT} from 'api/Cursors';
import commonCursorReducers from 'store/domains/cursor/cursorReducers';

const persistConfig = {
  key: 'constructors',
  storage: AsyncStorage,
};

const initState = {
  constructors: [],
  cursor: {
    ...CURSOR_INIT,
  },
};

const reducers = (state = initState, action) => {
  switch (action.type) {
    case 'CONSTRUCTORS_FETCHED':
      return {
        ...state,
        constructors: action.constructors,
        cursor: {
          ...action.cursor,
          loading: false,
        },
      };
    default:
      return commonCursorReducers('CONSTRUCTORS', state, action);
  }
};

export default persistReducer(persistConfig, reducers);
