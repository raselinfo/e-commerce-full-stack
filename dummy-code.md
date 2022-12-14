## 1 Call api for refresh token using Axios interceptor
```js
import axios from "axios";
import { fetchProps } from "store/types/CommonType";
import { getLoginCredentials, setLogout } from "utils/helper";

const rootURL = process.env.REACT_APP_ROOT_URL;
let isRefreshing = false;
let refreshSubscribers: any = [];
const localData: any = localStorage.getItem("Auth");
const parsData = JSON.parse(localData);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.data?.error?.status;
    const originalRequest = error?.config;
    
    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        axios
          .post(`${rootURL}refresh`, {
            refreshToken: parsData?.tokens?.refreshToken,
          })
          .then(({ data }) => {
            isRefreshing = false;
            const valueToRefresh = {
              ...parsData,
              token: data?.accessToken,
              tokens: {
                accessToken: data?.accessToken,
                refreshToken: parsData?.tokens?.refreshToken,
              },
            };
            localStorage.setItem("Auth", JSON.stringify(valueToRefresh));
            onRefreshes(data?.accessToken);
          })
          .catch((e) => {
            setLogout(window?.history);
          });
      }
      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((accessToken: any) => {
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          resolve(axios(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

function subscribeTokenRefresh(cb: any) {
  refreshSubscribers.push(cb);
}

function onRefreshes(accessToken: any) {
  refreshSubscribers.map((cb: any) => cb(accessToken));
}

const fetchHandler = (
  { url, method = "GET", actionType, body, secure }: fetchProps,
  successHandler?: (p: object) => void,
  errorHandler?: (p: object) => void
) => {
  const getMethod: any = method;
  const authValue = getLoginCredentials();

  axios({
    method: getMethod,
    headers: {
      "Content-Type": "application/json",
      ...(secure && { Authorization: `Bearer ${authValue?.token}` }),
      "Access-Control-Allow-Origin": "*",
    },
    url: `${rootURL}${url}`,
    ...(method !== "GET" && { data: body }),
  })
    .then((response) => {
      return triggerSuccessHandler(response);
    })
    .catch((err) => {
      return errorHandler && errorHandler(err);
    });

  const triggerSuccessHandler = (response: any) => {
    return successHandler ? successHandler(response?.data) : null;
  };
};
export default fetchHandler;

```


## 2 Call api for refresh token using Axios interceptor
```js
//after so long i found this solution with local storage


    // response interceptors =================================================
    let isRefreshing = false;
    let refreshSubscribers = [];

    

    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      const { config, response: { status } } = error;
      const originalRequest = config;

      if (status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          axios.post('api/auth/refresh',{
            "refreshToken": localStorage.getItem('refreshToken')
          }).then(({data}) => {
            isRefreshing = false;
           const {accessToken,refreshToken} = data;
            localStorage.setItem('authToken',accessToken);
            localStorage.setItem('refreshToken',refreshToken);
            onRrefreshed(data.accessToken);
          }).catch(e=>{
            window.location = '/logout'
          })
        }

        const retryOrigReq = new Promise((resolve, reject) => {
          subscribeTokenRefresh(accessToken => {
            // replace the expired accessToken and retry
            originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
            resolve(axios(originalRequest));
          });
        });
        return retryOrigReq;
      } else {
        return Promise.reject(error);
      }
    });

    function subscribeTokenRefresh(cb) {
      refreshSubscribers.push(cb);
    }

    function  onRrefreshed(accessToken) {
      refreshSubscribers.map(cb => cb(accessToken));
    }

```
