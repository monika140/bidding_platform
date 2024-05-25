const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require("./authRoutes");
const bidRoutes = require("./bidRoutes");
const itemRoutes = require("./itemRoutes");
const notificationRoutes = require("./notificationRoutes");
const app = express();

app.use(bodyParser.json());
app.use("/api/users", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/notifications", notificationRoutes);
app.use(errorMiddleware);

module.exports = app;
