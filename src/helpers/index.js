const { verify } = require("jsonwebtoken");

exports.verifyRefresh = (payload, token) => {
  try {
   const decoded = verify(token, "refreshSecret");
   return decoded.email === payload.email;
  } catch (error) {
   // console.error(error);
   return false;
  }
 }
