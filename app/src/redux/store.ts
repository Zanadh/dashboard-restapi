import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { sessionsReducer } from './reducers';
// import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// import { authReducers } from './modules/auth/reducers';
// import { getPersistConfig, StorageType } from './persistConfig';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// import storageSession from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptor = encryptTransform({
  secretKey: 'fauzan13',
  onError(error: Error) {
    // eslint-disable-next-line no-console
    console.error('createEncryptor error : ', error);
  },
});

const rootReducer = combineReducers({
  sessions: persistReducer(
    {
      key: 'root',
      storage,
      transforms: [encryptor],
    },
    sessionsReducer,
  ),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
