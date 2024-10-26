import express from 'express';
import cors from 'cors';
import fs from 'fs';
import productsRouter from './routes/products.js';

const app = express();
const PORT = 8585;

app.use(cors());
app.use(express.json());

//routes
app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});