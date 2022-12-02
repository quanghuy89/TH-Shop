import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
      // console.log(decode)

      req.user = await User.findById(decode.id).select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorization, token fail');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not Athorized, no token');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authoraized as a admin');
  }
};

export { protect, admin };
