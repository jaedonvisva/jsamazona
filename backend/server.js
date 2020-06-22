import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import products from './data';

const app = express();
app.use(cors());

mongoose.connect(
  'mongodb://localhost/jsamazona',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (e) => {
    if (e) {
      console.log('MongoDB Error', e);
    } else {
      console.log('DB Connected');
    }
  }
);

app.get('/api/products', (req, res) => {
  res.send(products);
});
app.get('/api/products/:id', (req, res) => {
  res.send(products.find((x) => x._id === req.params.id));
});

app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
