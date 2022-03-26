const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { port, mongoURI } = require("./config");

const router = require('./routes/index');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use('/api/v1', router);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, () => {
  console.log(`API running on port ${port}`)
})

module.exports = app;
