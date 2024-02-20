import express from 'express';
import route from './routers/product.router';

const app = express();

app.use(express.json());
app.use('/products', route);

export default app;
