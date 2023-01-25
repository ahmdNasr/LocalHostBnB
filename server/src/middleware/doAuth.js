const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.log("JWT Secret env variable is a must for this app to run!");
  process.exit(1);
}

function makeAuthMiddleware({ tokenType = "access" }) {
  return function doAuthMiddleware(req, res, next) {
    try {
      const token = extractToken(req);
      const tokenPayload = jwt.verify(token, jwtSecret); // { sub, type, iat, exp }
      if (tokenPayload.type !== tokenType) {
        throw new Error("Invalid Token Type!");
      }
      req.verifiedUserClaims = tokenPayload;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ err: "Invalid auth, please login first" });
    }
  };

  function extractTokenFromHeaders(req) {
    // assume it's an access token
    const AuthHeader = req.headers.authorization; // "Bearer <token>";
    if (!AuthHeader) {
      throw new Error("No Auth header");
    }

    console.log(AuthHeader);

    const [authSchema, token] = AuthHeader.split(" ");
    if (authSchema !== "Bearer" || !token) {
      throw new Error("Unsupported auth schema");
    }

    return token;
  }

  function extractTokenFromBody(req) {
    const token = req.body.refreshToken;
    if (!token) {
      throw new Error("refresh token must be set");
    }
    return token;
  }

  function extractToken(req) {
    return tokenType === "refresh"
      ? extractTokenFromBody(req) // FIXME: take refresh token from Cookies instead of body !!!!
      : extractTokenFromHeaders(req);
  }
}

module.exports = {
  makeAuthMiddleware,
};
