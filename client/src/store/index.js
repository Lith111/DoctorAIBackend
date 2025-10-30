import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './slices/authSlice';
import uiSlice from './slices/uiSlice';
import patientsSlice from './slices/patientsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // نحافظ على حالة المصادقة فقط
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    patients: patientsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);