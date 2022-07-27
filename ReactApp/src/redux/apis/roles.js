import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:roles',
  url: apiUrl.Roles,
  endpoints: (builder) => ({
    add: builder.add(),
    delete: builder.delete(),
    update: builder.update(),
    get: builder.get(),
    getItems: builder.getItems(),
    getList: builder.getList()
  })
});

export const { useAddMutation, useDeleteMutation, useUpdateMutation, useGetQuery, useGetItemsQuery, useGetListQuery } = api;