import jwt from "jsonwebtoken";
import { createError } from "./error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(createError(401, "unauthorized"));
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    next(createError(401, "token not valid "));
  }
};
const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "you are not allowed to do that"));
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "you are not allowed to do that"));
    }
  });
};
export { verifyToken, verifyUser, verifyAdmin };
