const { decode } = require("jsonwebtoken");
const { secretJwt } = require("../config");

exports.verifyUserByJWT = (request, response, next) => {
  const { authorization } = request.headers;

  if(!authorization) {
    return response.status(401).json({
      status: 401,
      message: 'Token not provided'
    })
  }

  try {
    const [, token] = authorization.split(" ");
    const decodedToken = decode(token, secretJwt);

    request.user = { ...decodedToken };
    next();
  } catch (err) {
    return response
      .status(500)
      .json({ status: 500, message: "Token authentication failed" });
  }
}
