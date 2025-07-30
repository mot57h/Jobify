import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

// Get all jobs created by the logged-in user
export const getAllJobs = async (request, res) => {
  const jobs = await Job.find({ createdBy: request.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

// Create a new job
export const createJob = async (request, res) => {
  request.body.createdBy = request.user.userId;
  const job = await Job.create(request.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Get a single job by ID
export const getJob = async (request, res) => {
  const { id } = request.params;

  const job = await Job.findById(id);
  res.status(StatusCodes.OK).json({ job });
};

// Update an existing job (✅ corrected with `id`)
export const updateJob = async (request, res) => {
  const { id } = request.params;

  // Optional: ensure user can only update their own job
  const updatedJob = await Job.findOneAndUpdate(
    { _id: id, createdBy: request.user.userId },
    request.body,
    { new: true }
  );

  if (!updatedJob) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Job not found or unauthorized' });
  }

  res.status(StatusCodes.OK).json({ msg: 'Job modified', job: updatedJob });
};

// Delete a job by ID
export const deleteJob = async (request, res) => {
  const { id } = request.params;

  const removedJob = await Job.findOneAndDelete({
    _id: id,
    createdBy: request.user.userId, // ✅ user can delete only their own jobs
  });

  if (!removedJob) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Job not found' });
  }

  res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removedJob });
};
