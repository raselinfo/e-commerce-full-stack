DB
```js
module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};

```

# E-Commerce (Full Stack)

![Image Title](./images/delivery.webp)

## Requirement

> A E-Commerce web application where people can by their preferred products. And payment by <mark> Paypal <mark>

There are three stack holder

- Developer (Developer develop whole e-commerce system)
- Admin (Admin can manage stocked product, handle order, deliver product)
- Customer (Buy products, received products and pay for product)

## Model

### Product:

- Name => String (Nx Slim Shirt)
- Slug => String (nx-slim-shirt)
- Price => Number (50)
- Description => String (Good quality Product)
- Image => String (URL)
- Category => ID (Shirt)
- Stock => String (20)
- Brand => String (NX)
- reviews => ID (4.5 , Good)
- CreatedAt => Date (10/10/2022)
- UpdatedAt => Date (11/10/2022)

### Category

- Name => String (Shirt)
- CreatedAt => Date (10/10/2022)
- UpdatedAt => Date (11/10/2022)

### Review

- Rating => Number (4.5)
- text => String (Good Shirt)
- CreatedAt => Date (10/10/2022)
- UpdatedAt => Date (11/10/2022)

