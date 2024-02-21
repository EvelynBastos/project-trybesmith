import express from 'express';
import route from './routers/product.router';
import userRoute from './routers/user.router';

const app = express();

app.use(express.json());
app.use('/products', route);
app.use('/users', userRoute);

export default app;
