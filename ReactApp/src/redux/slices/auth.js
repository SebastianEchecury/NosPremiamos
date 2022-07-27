import { createSlice } from '@reduxjs/toolkit';

import { api as auth } from '../apis/auth';
import { api as users } from '../apis/users';

const slice = createSlice({
  name: 'slice:auth',
  initialState: { token: '', permissions: [], name: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(auth.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.permissions = payload.permissions;
    });
    builder.addMatcher(auth.endpoints.logout.matchFulfilled, (state) => {
      state.token = '';
      state.permissions = [];
      state.name = '';
    });
    builder.addMatcher(users.endpoints.getHeader.matchFulfilled, (state, { payload }) => {
      state.name = payload.name;
      state.permissions = payload.permissions;
    });
    builder.addMatcher(users.endpoints.getHeader.matchRejected, (state, { meta }) => {
      if (!meta.condition) {
        state.token = '';
        state.permissions = [];
        state.name = '';
      }
    });
  }
});

export default slice.reducer;