import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword,comparePassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (request, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  request.body.role = isFirstAccount ? 'admin' : 'user';
  
  const hashedPassword = await hashPassword(request.body.password);
  request.body.password = hashedPassword;
 
  
  const user = await User.create(request.body);
  res.status(StatusCodes.CREATED).json({msg:' user created'});
};

export const login = async (request, res) => {
  const user = await User.findOne({ email: request.body.email });

  const isValidUser = user && await comparePassword(request.body.password, user.password);

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
  httpOnly: true,
  expires: new Date(Date.now() + oneDay),
  secure: process.env.NODE_ENV === 'production',
});
    res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

export const logout = (request,res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};
