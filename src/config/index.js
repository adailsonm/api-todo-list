const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT || 300,
  mongoURI: process.env.MONGO_URI,
  saltRoundsHash: parseInt(process.env.SALT_ROUNDS_HASH, 10),
  secretJwt: process.env.SECRET_JWT
};
