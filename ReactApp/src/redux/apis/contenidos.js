import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:contenidos',
  url: apiUrl.Contenidos,
  endpoints: (builder) => ({
    getList: builder.getList()
  })
});

export const { useGetListQuery } = api;