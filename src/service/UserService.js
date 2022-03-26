const bcrypt = require("bcrypt");

const User = require('../models/User');
const { saltRoundsHash } = require("../config/index");

exports.findExists = async (email) => {
  const user = await User.findOne({ email });

  if(!!user) {
    throw Error("E-mail already exists");
  }
  return false;
}

exports.findByEmail = async (email) => {
  const user = await User.findOne({ email });

  if(!!user) {
    return user;
  }
  return false;
}

exports.findByName = async (name) => {
  const user = await User.find({ name: { $regex: `.*${name}.*`}}).select('-password').select('-email').select('-__v');

  if(!!user) {
    return user;
  }
  throw Error("name not found")
}

exports.persist = async (data) => {
  let hash = bcrypt.hashSync(data.password, saltRoundsHash);
  return await User.create({
    name: data.name,
    email: data.email,
    password: hash
  });
}
