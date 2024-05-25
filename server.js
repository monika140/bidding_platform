const express = require("express");
const app = express();
const cors = require("cors");
const index = require("./routes/index");

//* Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.send("hello");
});

app.use(cors());
// * Routes file
app.use(routes);

// server start
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
