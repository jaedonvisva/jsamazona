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
export const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  console.log(req.headers);
  // 'bearer XXXXXXXXXX
  if (bearerToken) {
    const token = bearerToken.slice(7, bearerToken.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
