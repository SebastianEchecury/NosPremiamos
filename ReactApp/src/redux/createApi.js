import { createApi as rktCreateApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';

const camelize = (value) => {
  return value.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
    if (+match === 0) {
      return '';
    }
    else {
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    }
  });
};

const normalizeQueryParameters = ({ filter, order = [], pagination = {} } = {}) => {
  const condition = order.at(-1) || {};
  const key = Object.keys(condition).at(0);
  const value = condition[key];

  return {
    ...filter,
    Sort: (key && value) ? `${key} ${value}` : undefined,
    Page: (pagination.index !== undefined) ? pagination.index + 1 : pagination.index,
    PageSize: pagination.size
  };
};

const normalizeErrors = (errors) => {
  return Object.entries(errors).reduce((errors, [key, value]) => {
    return {
      ...errors,
      [camelize(key)]: value
    };
  }, {});
};

export default function createApi({ url, tagTypes = [], endpoints, ...options }) {
  const apiTagType = options.reducerPath;

  return rktCreateApi({
    baseQuery: fetchBaseQuery({
      baseUrl: url,
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
      paramsSerializer: (params) => queryString.stringify(params)
    }),
    tagTypes: [
      ...tagTypes,
      apiTagType
    ],
    endpoints: (rktBuilder) => {
      const builder = {
        ...rktBuilder,
        normalizeQueryParameters: normalizeQueryParameters,
        normalizeErrors: normalizeErrors,
        tagType: apiTagType,
        add: () => rktBuilder.mutation({
          query: (item) => ({
            url: '',
            method: 'POST',
            body: item,
            responseHandler: (response) => {
              if (response.ok) {
                return response.json();
              }
              else {
                return response.json().then((response) => normalizeErrors(response.errors));
              }
            }
          }),
          invalidatesTags: [{ type: apiTagType, id: '*' }]
        }),
        delete: () => rktBuilder.mutation({
          query: (id) => ({
            url: '',
            method: 'DELETE',
            params: {
              PrimaryKey: id
            },
            responseHandler: (response) => {
              if (response.ok) {
                return response.text();
              }
              else {
                return response.json().then((response) => normalizeErrors(response.errors));
              }
            }
          }),
          transformResponse: (response) => ({ message: response }),
          invalidatesTags: (result, error, id) => [{ type: apiTagType, id: id }]
        }),
        update: () => rktBuilder.mutation({
          query: (item) => ({
            url: '',
            method: 'PUT',
            body: item,
            responseHandler: (response) => {
              if (response.ok) {
                return response.text();
              }
              else {
                return response.json().then((response) => normalizeErrors(response.errors));
              }
            }
          }),
          transformResponse: (response) => ({ message: response }),
          invalidatesTags: (result, error, item) => [{ type: apiTagType, id: item.id }]
        }),
        get: () => rktBuilder.query({
          query: (id) => ({
            url: '',
            params: {
               id
            }
          }),
          providesTags: (result, error, id) => ([{ type: apiTagType, id: id }]),
            transformResponse: (response) => {
              if (response.Status == 0) {
                return response.DataObject;
              }
              else {
                return response.json().then((response) => normalizeErrors(response.errors));
              }
            }
        }),
        getItems: () => rktBuilder.query({
          query: ({ filter, order = [], pagination = {} } = {}) => ({
            url: 'Items',
            params: normalizeQueryParameters({ filter, order, pagination })
          }),
          providesTags: (result) => {
            if (result) {
              return [...result.map(({ id }) => ({ type: apiTagType, id })), { type: apiTagType, id: '*' }];
            }
            else {
              return [{ type: apiTagType, id: '*' }];
            }
          }
        }),
        getList: () => rktBuilder.query({
          query: ({ filter, order = [], pagination = {} } = {}) => {
            return ({
              url: 'List',
              params: normalizeQueryParameters({ filter, order, pagination })
            })
          },
          transformResponse: (response) => ({
            data: response.DataObject,
            length: response.DataObject.length
          }),
          providesTags: (result) => {
            if (result?.data) {
              return [...result.data.map(({ id }) => ({ type: apiTagType, id })), { type: apiTagType, id: '*' }];
            }
            else {
              return [{ type: apiTagType, id: '*' }];
            }
          }
        })
      };

      return endpoints(builder);
    },
    ...options
  });
}