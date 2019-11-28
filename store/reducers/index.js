import { combineReducers } from 'redux';

import mealsReducer from './meals';

const rootReducer = combineReducers({
  mealsReducer: mealsReducer
});

export default rootReducer;
