import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:user-roles',
  url: apiUrl.UserRoles,
  endpoints: (builder) => ({
    add: builder.add(),
    delete: builder.delete(),
    update: builder.update(),
    get: builder.get(),
    getList: builder.getList()
  })
});

export const { useAddMutation, useDeleteMutation, useUpdateMutation, useGetQuery, useGetListQuery } = api;