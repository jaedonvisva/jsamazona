import jwt from 'jsonwebtoken';
import config from './config';

export const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      idAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );
};
