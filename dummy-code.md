## 1 Call api for refresh token using Axios interceptor
```js
import axios from 'axios';

export const publicAxios = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

export const privateAxios = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true
});

privateAxios.interceptors.request.use(
  async (req) => {
    const accessToken = getAccessToken();
    req.headers.authorization = `Bearer ${accessToken}`;
    return req;
  },
  (err) => Promise.reject(err)
);

privateAxios.interceptors.response.use(
  (res) => {
    console.log('I am response');
    return res;
  },
  async (err) => {
    const config = err?.config;
    if (err?.response?.status === 401 && !config?.sent) {
      config.sent = true;
      //  Get Refresh Token
      try {
        const result = await publicAxios.post('/api/refresh-token');
        if (result?.data?.data?.accessToken) {
          sessionStorage.setItem('accessToken', result.data.data.accessToken);
          config.headers.authorization = `Bearer ${result.data.data.accessToken}`;
        }
        return privateAxios(config);
      } catch (error) {
        console.log('Catch ❌', error);
        if (error.response.status === 403) {
        //   window.location.href = 'https://www.google.com';
        }

        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

```

## Create Token Secret using node modules

```js
require('crypto').randomBytes(64).toString('hex')
'd46842e82a460b9bb2483a9aced74e6fbbc45cf4ac241b18284de22ad9c2eb7c9e1f20f29ae89ff50cd0e24cb7497614dd20d44ce66fd0f392f9f8e04a924773'
```

## Install SSL certificate on express server
```js
const https = require('https');
const path = require('path');
const fs = require('fs');

const sslServer = https.createServer(
  {
    key: '',
    cert: '',
  },
  app
);

 sslServer.listen(PORT || 4000, () => {
      console.log(`✅ http://localhost:${PORT}`);
    });
    
    
   // Create key and cert inside cert folder 🔽
   1. Generate a private key (openssl genrsa -out key.pem)
   2. Create a CSR ( certificate signing request) usgin private key (openssl req -new -key key.pem -out csr.pem)
   3. Generate the SSL certification from CSR (openssl x509 -req -days 365 -in csr.pem -signkey key.pem
-out cert.pem)

```

