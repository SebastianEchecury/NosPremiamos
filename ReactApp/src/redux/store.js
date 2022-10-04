import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { api as auth } from './apis/auth';
import { api as parametros } from './apis/parametros';
import { api as permissions } from './apis/permissions';
import { api as roles } from './apis/roles';
import { api as users } from './apis/users';
import {api as categorias} from './apis/categorias';
import {api as votos} from './apis/votos';
import {api as empleadosCategorias} from './apis/empleadoscategorias';

import authReducer from './slices/auth';
import missingTranslationsReducer from './slices/missing-translations';

const apis = [
  auth,
  parametros,
  permissions,
  roles,
  users,
  categorias,
  empleadosCategorias,
  votos

];

const reducer = apis.reduce((reducer, api) => ({ ...reducer, [api.reducerPath]: api.reducer }), {});
const middleware = apis.map(api => api.middleware);

export const store = configureStore({
  reducer: {
    ...reducer,
    auth: persistReducer({ key: 'auth', storage }, authReducer),
    missingTranslations: persistReducer({ key: 'missing-translations', storage }, missingTranslationsReducer),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }).concat(middleware)
});
export const persistor = persistStore(store);

setupListeners(store.dispatch);