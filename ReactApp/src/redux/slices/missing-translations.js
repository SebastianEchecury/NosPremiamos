import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'slice:missing-translations',
  initialState: {},
  reducers: {
    add: (state, { payload: { group, keys } }) => {
      return {
        ...state,
        [group]: [
          ...(state[group] || []).filter((key) => !keys.includes(key)),
          ...keys
        ]
      };
    },
    remove: (state, action) => {
      return state.filter((translation) => translation !== action.payload)
    }
  }
});

export const { add } = slice.actions;

export default slice.reducer;