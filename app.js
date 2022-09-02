//DOTENV enviroment
require("dotenv").config();

//extra security packages
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

//error handling
require("express-async-errors");

//database connection
const connectDB = require("./bd/connect");

//middleware
const errorHandlerMiddleware = require("./middel-ware/error-handler");
const notFoundMiddleWare = require("./middel-ware/notFound");

//Routes
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const paymentRouter = require("./routes/payment");

//app
const express = require("express");
const app = express();
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, // limit each IP to 100 requests per wiondowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//for retricting access to my backend
// const corsOptions = {
//   origin: "http://localhost:8080",
//   optionsSuccessStatus: 200, // For legacy browser support
// };
app.use(cors());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/payments", paymentRouter);

//applying middelware to your function to the app
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleWare);

//connecting to the database and starting up the server
const port = process.env.port || 3000;
const URI = process.env.MONGO_URI;
const start = async () => {
  try {
    await connectDB(URI).then(() =>
      console.log("database connected successfully.")
    );
    app.listen(port, () =>
      console.log(" server is listening on port 3000....")
    );
  } catch (error) {
    console.log(error);
  }
};
start();
