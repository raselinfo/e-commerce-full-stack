const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('./utils/logger');
const connectDB = require('./db/db');
const errorMiddleware = require('./middleware/error/errorMiddleware.js');
const { PORT, MONGODB_URI } = require('./config');
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: 10000000000 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// /-------------------------
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// Todo: Cors Install
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://raselofficial.me',
      'https://api.raselofficial.me',
      'https://developers.google.com/oauthplayground',    
    ],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET,PUT,POST,DELETE,UPDATE,OPTIONS'],
    exposedHeaders: ['set-cookie'],
  })
);

// Todo: Logger
logger(app);

/**
  // Todo: Routes:
 * Seed Products and Users Routes
 * Product Routes
 * Auth Routes
 * Verify Email
 * Forgot Password
 * Reset Password
 */
app.use('/api/v1', require('./routes/seedRoutes'));
app.use('/api/v1', require('./routes/productRoutes'));
app.use('/api/v1', require('./routes/auth/authRoutes'));
app.use('/api/v1', require('./routes/verify/emailVerifyRoutes'));
app.use('/api/v1', require('./routes/forgotPassword/forgotPasswordRoutes'));
app.use('/api/v1', require('./routes/resetPassword/resetPassRoutes'));
app.use('/api/v1', require('./routes/Charge/shippingChargeRoutes'));
app.use('/api/v1', require('./routes/auth/refreshTokenRoute'));
app.use('/api/v1', require('./routes/auth/logoutRoutes'));


// Protected Route
app.post(
  '/api/v1/test',
  // require('./middleware/auth/user.middleware'),
  require('./middleware/auth/authentication.middleware'),
  (req, res) => {
    console.log('hello test');
    res.send('Test is ok');
  }
);

// Todo: Health Route
app.get('/api/v1/health', (req, res) => {
  console.log('Hello 🥰 i am rasel hossain');
  res.send('OK');
});

// Todo: Error Middleware
app.use(errorMiddleware);

// Todo: Connect DB
connectDB(MONGODB_URI)
  .then(({ connection: { host, port, name } }) => {
    console.log(`✅ ${name} is connect at : ${host}:${port}`);
    app.listen(PORT || 4000, () => {
      console.log(`✅http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
