const jwt = require("jsonwebtoken");
require("dotenv").config();


const createAccessToken = (id) => {
  return jwt.sign({ userID: id },process.env. ACCESS_TOKEN_SECRET,{
  expiresIn: 3 * 24 * 60 * 60,//expires in 3 days
});
};

module.exports = { createAccessToken };
