import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./Routes/auth.js";
import usersRoute from "./Routes/users.js";
import hotelsRoute from "./Routes/hotels.js";
import roomsRoute from "./Routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!!!");
  } catch (error) {
    throw error;
  }
};

//middleware
app.use(express.json());
app.use(cookieParser())
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatust = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  res.status(errorStatust).json({
    succes: false,
    status: errorStatust,
    message: errorMessage,
    satck: err.stack,
  });
  next();
});



app.listen(4000, () => {
  connect();
  console.log("Server is running on port 4000!!!");
});
