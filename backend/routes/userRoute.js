import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import User from '../models/userModel';
import { getToken } from '../utils';

const router = express.Router();
router.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const signedinUser = await User.findOne({
      email: req.body.email,
    });
    if (
      signedinUser &&
      bcrypt.compareSync(req.body.password, signedinUser.password)
    ) {
      res.send({
        name: signedinUser.name,
        email: signedinUser.email,
        isAdmin: signedinUser.isAdmin,
        token: getToken(signedinUser),
      });
    } else {
      res.status(401).send({ message: 'Invalid User or Password!' });
    }
  })
);
router.get(
  '/createadmin',
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123', 12),
        isAdmin: true,
      });
      const createdUser = await user.save();
      res.send(createdUser);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

router.post(
  '/register',
  [body('email').isEmail(), body('name').isLength({ min: 3 })],
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // error
      res
        .status(400)
        .send({ message: 'Data is not valid.', errors: errors.array() });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
      });
      const newUser = await user.save();
      if (newUser) {
        res.status(201).send({
          _id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser),
        });
      } else {
        res.status(500).send({ message: 'Invalid User Data.' });
      }
    }
  })
);

export default router;
