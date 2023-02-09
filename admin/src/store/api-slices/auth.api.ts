import publicApi from '../../api/public.api';

export const authApi = publicApi.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (credentials) => ({
          url: '/auth/signin',
          method: 'POST',
          body: credentials,
        }),
      }),
    };
  },
});

export const { useLoginMutation } = authApi;
