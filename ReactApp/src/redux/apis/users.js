import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:users',
  url: apiUrl.Users,
  endpoints: (builder) => ({
    add: builder.add(),
    delete: builder.delete(),
    update: builder.update(),
    get: builder.get(),
    getHeader: builder.query({
      query: () => ({ url: 'GetHeader' })
    }),
    getList: builder.getList(),
    empleadosRepresentantes: builder.query({
      query: () => ({url: 'EmpleadosRepresentantes'})      
    }),
  })
});

export const { useAddMutation, useDeleteMutation, useUpdateMutation, useGetQuery, useGetHeaderQuery, useGetListQuery, useEmpleadosRepresentantesQuery } = api;