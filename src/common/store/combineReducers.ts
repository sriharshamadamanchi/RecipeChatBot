import { combineReducers } from 'redux';
import { loaderReducer } from '../loaderRedux/reducer';
import { dashboardReducer } from '../../Dashboard/redux/reducer';

export const reducers = combineReducers({
  loader: loaderReducer,
  dashboard: dashboardReducer
});
