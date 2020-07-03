import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import products from './data';
import userRoute from './routes/userRoute';

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(
  'mongodb://localhost/jsamazona-new',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (e) => {
    if (e) {
      console.log('MongoDB Error', e);
    } else {
      console.log('DB Connected');
    }
  }
);
app.use('/api/users', userRoute);
app.get('/api/products', (req, res) => {
  res.send(products);
});
app.get('/api/products/:id', (req, res) => {
  res.send(products.find((x) => x._id === req.params.id));
});
/* Serve Frontend */
app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
