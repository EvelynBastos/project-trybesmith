import express from 'express';
import route from './routers/product.router';
import userRoute from './routers/user.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/products', route);
app.use('/users', userRoute);
export default app;
