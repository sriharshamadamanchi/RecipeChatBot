import createSagaMiddleware from 'redux-saga';
import { reducers } from './combineReducers';
import { sagas } from './combineSagas';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tuple, configureStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  whitelist: ['dashboard'], // Only these reducers will be persisted.
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);
const initState: any = {};

const sagaMiddleware = createSagaMiddleware();
export const store: any = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple(sagaMiddleware),
  preloadedState: initState
});

export const persistor: Persistor = persistStore(store);
sagaMiddleware.run(sagas);

store.subscribe(() => {
  console.log('Store Changed ', store.getState());
});
