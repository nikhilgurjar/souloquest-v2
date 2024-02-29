import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
// slices

import tourCompanyRedcer from './slices/tourCompany'
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  tourCompany: tourCompanyRedcer
});

export { rootPersistConfig, rootReducer };
