import {createStore, combineReducers} from 'redux';
import authReducer from './src/reducers/authReducers';
import contactReducer from './src/reducers/KontakReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
