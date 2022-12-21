const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'build')));
// /-------------------------
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Todo: Cors Install
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'https://ecommerceserver.onrender.com',
      'https://e-commerce-client-u78t.onrender.com',
      'https://e-commerce-full-stack-one.vercel.app',
      'https://accounts.google.com',
      'https://accounts.google.com/gsi/log',
      'https://accounts.google.com/gsi/status',
      'https://lh3.googleusercontent.com',
      'https://developers.google.com/oauthplayground',
      'https://accounts.google.com/gsi/status?client_id=642165220764-2khvsfgpm17br7fokbgr64rvltgr72r5.apps.googleusercontent.com&as=qm%2FHta4GRaCb6bjzdHmkKQ',
    ],
    // optionsSuccessStatus: 200,
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
  require('./middleware/auth/user.middleware'),
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build'));
});

// Todo: Error Middleware
app.use(errorMiddleware);

// Todo: Connect DB
connectDB(MONGODB_URI)
  .then(({ connection: { host, port, name } }) => {
    console.log(`${name} is connect at : ${host}:${port}`);
    app.listen(PORT || 4000, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error: ', err);
  });
