import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';

export const getCurrentUser = async (request, res) => {
  const user = await User.findOne({_id:request.user.userId});
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword  });
};

export const getApplicationStats = async (request, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users,jobs });
};

export const updateUser = async (request, res) => {
console.log(request.file);
const obj ={...request.body};
delete obj.password;

const updatedUser = await User.findByIdAndUpdate(request.user.userId, request.body);
  res.status(StatusCodes.OK).json({ msg: 'update user' });
};  