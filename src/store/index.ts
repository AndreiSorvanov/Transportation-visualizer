import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../saga';
import { rootReducer } from './reducer';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), sagaMiddleware]
});

sagaMiddleware.run(rootWatcher);

export * from './reducer';
