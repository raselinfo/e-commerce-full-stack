const app = require('./app/app');
const { PORT, MONGODB_URI } = require('./config');
const connectDB = require('./db/db');

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
