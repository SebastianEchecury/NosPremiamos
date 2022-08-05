import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { api as auth } from './apis/auth';
import { api as cupos } from './apis/cupos';
import { api as parametros } from './apis/parametros';
import { api as permissions } from './apis/permissions';
import { api as representantes } from './apis/representantes';
import { api as representantePatentes } from './apis/representante-patentes';
import { api as roles } from './apis/roles';
import { api as talonarios } from './apis/talonarios';
import { api as translation } from './apis/translations';
import { api as users } from './apis/users';
import { api as userTypes } from './apis/user-types';
import { api as contenidos} from './apis/contenidos';
import { api as talonarioTickets} from './apis/talonario-tickets';
import {api as userRoles} from './apis/user-roles';

import authReducer from './slices/auth';
import missingTranslationsReducer from './slices/missing-translations';

import { api as terminales } from './apis/terminales';

const apis = [
  auth,
  cupos,
  parametros,
  permissions,
  representantes,
  representantePatentes,
  talonarios,
  roles,
  translation,
  users,
  userTypes,
  terminales,
  contenidos,
  talonarioTickets,
  userRoles

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