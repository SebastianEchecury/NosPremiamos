import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:auth',
  url: apiUrl.Auth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: 'Login',
        method: 'POST',
        body: {
          email,
          password
        },
        responseHandler: (response) => {
          if (response.ok) {
            return response.json();
          }
          else {
            return response.json().then((response) => builder.normalizeErrors(response.errors));
          }
        }
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'Logout',
        method: 'POST'
      })
    }),
    lostPassword: builder.mutation({
      query: ({ email }) => ({
        url: 'SendPasswordRecovery',
        method: 'POST',
        body: { email },
        responseHandler: (response) => {
          if (response.ok) {
            return response.ok;
          }
          else {
            return response.json().then((response) => builder.normalizeErrors(response.errors));
          }
        }
      }),
    }),
    ResetPassword: builder.mutation({
      query: ({ password , passwordnueva, empleadoid,}) => ({
        url: 'CambiarPassword',
        method: 'POST',
        body:{password, passwordnueva, empleadoid},
        responseHandler: (response) => {
          if (response.ok) {
            return response.ok;
          }
          else {
              return response.json().then((response) => builder.normalizeErrors(response.errors));
          }
        }
      }),
    }),
  })
});

export const { useLoginMutation, useLogoutMutation, useLostPasswordMutation, useResetPasswordMutation} = api;