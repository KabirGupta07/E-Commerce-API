const dotenv = require("dotenv");

const Logger = require('./utils/logger');

const logger = new Logger('BACKEND');

let NODE_ENV = process.env.NODE_ENV || 'development';
let envFilePath = `.env.${NODE_ENV}`;
dotenv.config({ path: envFilePath });

console.log(`NODE_ENV: ${NODE_ENV}`);

const express = require("express");
const app = express();

const mongoose = require("mongoose");

// ROUTES
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connection Successfull!")
    })
    .catch((err) => {
        console.log(err);
    });

//REST END-POINTS
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);


let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.silly('This is a silly log');
    logger.debug('This is a debug log');
    logger.verbose('This is a verbose log');
    logger.info('This is an info log');
    logger.info(`Backend Server runnning on PORT ${PORT}`);
})