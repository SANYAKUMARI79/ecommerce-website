import { combineReducers } from "redux";

const initialReducer = (state = {}, action) => {
  return state;
};

const rootReducer = combineReducers({
  initial: initialReducer, // Add other reducers here
});

export default rootReducer;
