import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import cors from "cors";
import { seedInitialCinema } from './services/cinemaServices';
import cinemaRoute from './routes/cinemaRoute';
import { seedInitialSport } from './services/sportService';
import sportRoute from './routes/sportRoute';
import cartRoute from './routes/cartRoute';

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json())
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URL || ' ')
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log("Failed to connect", err));

  seedInitialCinema()
  seedInitialSport()

  app.use('/user',userRoute)
  app.use('/cinema',cinemaRoute)
  app.use('/sport',sportRoute)
  app.use('/cart',cartRoute)


app.listen(port, () => {
  console.log("Server is running at: http://localhost:3001");
});
