require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./src/routes/user');
const reportRoutes = require('./src/routes/report');

const port = process.env.PORT ?? 5500;
const uri = process.env.MONGO_URI;
const wweb = require('./src/wweb');

mongoose.connect(
  uri,
)
.then(()=>console.log('MongoDB connected'))
.catch(e=> {
  throw new Error(e)
});

app.use(express.json());
app.use('/user', userRoutes);
app.use('/report', reportRoutes);

try {
  app.listen(port, async () => {
    await console.log(`Server is running on port ${port} 🔥`);
    wweb.start();
  });
} catch (err) {
  throw new Error('An error ocurred trying to start server.', err);
}
