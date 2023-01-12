import { useEffect, useReducer } from 'react';
import formateError from '../utils/formateError';
import pAxios from './useAxios';
import publicAxios from '../utils/axios';

// Initial State
const initialState = {
  data: null,
  error: null,
  loading: true,
};
// Actions
const { REQUEST, SUCCESS, FAIL, RESET } = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  RESET: 'RESET,',
};
// Reducer
const reducer = (state, { type, payload }) => {
  switch (type) {
    case REQUEST:
      return { ...state, loading: true };
    case SUCCESS:
      return { ...state, data: payload, loading: false };
    case FAIL:
      return { ...state, loading: false, error: payload };
    case RESET:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};

// useFetch Hook
/**
 *
 * @param {string} url
 * @param {object} options
 * @returns {object} {data,loading,error}
 */
const useFetch = ({
  url,
  options = {
    method: 'get',
    body: null,
    private: false,
  },
}) => {
  const [{ data, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const privateAxios = pAxios();

  let axios;
  if (options.private) {
    axios = privateAxios;
  } else {
    axios = publicAxios;
  }

  //   Hit api
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: REQUEST });

        const response = await axios(url, {
          method: options.method,
          ...(options.body && { data: options.body }),
        });
        dispatch({ type: SUCCESS, payload: response.data });
      } catch (err) {
        dispatch({ type: FAIL, payload: formateError(err) });
      }
    };
    if (options.method) {
      fetchData();
    } else {
      dispatch({ type: RESET });
    }
  }, [axios, options.body, options.method, url]);
 
  return { data, error, loading, dispatch };
};

export default useFetch;
