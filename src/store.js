import {createStore, combineReducers} from 'redux';
import authReducer from './reducers/authReducers';
import contactReducer from './reducers/KontakReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
