const jwt = require("jsonwebtoken");
const gettoken = (token) => {
    
    const authorization = token
    if (authorization) {
      return authorization
    }
    return null;
};
module.exports = gettoken;