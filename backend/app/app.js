const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('../utils/logger');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const YML = require('yamljs');
const errorMiddleware = require('../middleware/error/errorMiddleware.js');
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: 10000000000 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Todo: Cors Install
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://raselofficial.me',
      'https://api.raselofficial.me',
      'http://api.raselofficial.me',
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

// Swagger UI
const swaggerJsDocs = YML.load(path.join(__dirname, '../docs', 'api_docs.yml'));
app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
/**
  // Todo: Routes:
 * Seed Products and Users Routes
 * Product Routes
 * Auth Routes
 * Verify Email
 * Forgot Password
 * Reset Password
 */
app.use('/api/v1', require('../routes/seedRoutes'));
app.use('/api/v1', require('../routes/productRoutes'));
app.use('/api/v1', require('../routes/auth/authRoutes'));
app.use('/api/v1', require('../routes/verify/emailVerifyRoutes'));
app.use('/api/v1', require('../routes/forgotPassword/forgotPasswordRoutes'));
app.use('/api/v1', require('../routes/resetPassword/resetPassRoutes'));
app.use('/api/v1', require('../routes/Charge/shippingChargeRoutes'));
app.use('/api/v1', require('../routes/auth/refreshTokenRoute'));
app.use('/api/v1', require('../routes/auth/logoutRoutes'));
app.use('/api/v1', require('../routes/storeUtils/storeUtilsRoutes'));
app.use('/api/v1', require('../routes/coupon/couponRoutes'));
app.use('/api/v1', require('../routes/order/orderRoutes'));
app.use('/api/v1', require('../routes/paypal/paypalRoutes'));

// Todo: Health Route
app.get('/api/v1/health', (req, res) => {
  console.log('Hello 🥰 i am rasel hossain');
  res.send('OK');
});

// Todo: Error Middleware
app.use(errorMiddleware);

module.exports = app;
