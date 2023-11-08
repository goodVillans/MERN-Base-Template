import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

dotenv.config(); 
const port = process.env.PORT || 8080;

connectDB();

const app = express();

// allows for the display of req,res data in JSON
app.use(express.json());
// allows the send of form data to be sent
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Server is Ready")
})
// use error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {console.log(`Server listening on ${port}`)});
