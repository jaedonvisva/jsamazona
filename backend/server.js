import express from 'express';
import products from './data';
import cors from 'cors';
import mongoose from 'mongoose';

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

app.listen(5000, () => {
  console.log('serve at http://localhost:5000');
});
