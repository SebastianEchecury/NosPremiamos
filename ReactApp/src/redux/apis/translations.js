import createApi from '../createApi';

import { apiUrl } from '../../utils/apiUrl';

export const api = createApi({
  reducerPath: 'api:translations',
  url: apiUrl.Translation,
  endpoints: (builder) => ({
    getTranslationValues: builder.query({
      query: (group) => ({
        url: 'GetTranslationValues',
        params: {
          translationGroup: group
        }
      })
    })
  })
});

export const { useGetTranslationValuesQuery } = api;