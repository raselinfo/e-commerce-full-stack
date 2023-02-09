import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const publicApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_SERVER_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
});

export default publicApi;
