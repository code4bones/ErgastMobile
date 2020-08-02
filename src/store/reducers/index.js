import {combineReducers} from 'redux';

import seasonsReducers from 'store/domains/seasons/seasonsReducers';
import seasonDetailsReducers from 'store/domains/seasons/seasonsDetailsReducers';

import resultsReducers from 'store/domains/results/resultsReducers';
import constructorsReducers from 'store/domains/constructors/constructorsReducers';

const rootReducer = combineReducers({
  seasonsReducers,
  seasonDetailsReducers,
  resultsReducers,
  constructorsReducers,
});

export default rootReducer;
