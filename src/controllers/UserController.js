const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require('../service/UserService');
const { secretJwt } = require("../config/index");
const { verifyRefresh } = require("../helpers");

exports.create = async (request, response) => {
  const data = request.body;

  try {
    await userService.findExists(data.email);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }

  try {
    await userService.persist(data);
  } catch(error) {
    console.log(error)
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }

  
  return response.status(201).json({
    status: 201,
    message: "User created sucessfully",
  });
}

exports.login = async (request, response) => {
  const { email, password} = request.body;

  if(!email || !password) {
    return response.status(400).json({
      status: 400,
      message: "E-mail and password are required"
    });
  }

  const user = await userService.findByEmail(email);

  if(!user) {
    return response.status(404).json({
      status: 400,
      message: "Informed email does not exist"
    })
  }

  const matchCompare = bcrypt.compareSync(password, user.password);
  
  if(!matchCompare) {
    return response.status(400).json({
      status: 400,
      message: "Password is incorrect"
    })
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email
  }

  
  return response.json({
    name: user.name,
    token: jwt.sign(payload, secretJwt, {
      expiresIn: '2h'
    }),
    refreshToken: jwt.sign(payload, 'refreshSecret', {
      expiresIn: '4h'
    }),
  })

}

exports.refreshToken = async(request, response) => {
  const { payload, refreshToken } = request.body;
  const isValid = verifyRefresh(payload, refreshToken);

  if (!isValid) {
    return response
      .status(401)
      .json({ status: 401, message: "Invalid token,try login again" });
  }

  const accessToken = jwt.sign(payload, "accessSecret", {
    expiresIn: "2h",
  });
  return response.status(200).json({ success: 200, accessToken });
}
exports.search = async (request, response) => {
  const { name } = request.query;
  try {
    const user = await userService.findByName(name);
    return response.status(200).json({
      status: 200,
      data: user,
    })
  } catch(error) {
    return response.status(404).json({
      status: 404,
      message: error.message
    })
  }
  

}
