const jwt = require("jsonwebtoken");

// const jwtMiddleware = (req, res, next) => {
//   const token = req.header("x-auth-token");

//   if (!token) {
//     return res.status(401).json({ message: "No token, authorization denied." });
//   } else {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded.user;

//       next();
//     } catch (err) {
//       res.status(401).json({ message: "Token is not valid" });
//     }
//   }
// };

const jwtMiddleware = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  let checkBearer = "Bearer ";

  if (token) {
    if (token.startsWith(checkBearer)) {
      token = token.slice(checkBearer.length, token.length);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "Authentication failed"
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: "No token, authorization denied."
    });
  }
};

module.exports = jwtMiddleware;
