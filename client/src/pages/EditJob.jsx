// EditJob.jsx
import { FormRow, FormRowSelect } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import {
  useLoaderData,
  useNavigation,
  Form,
  redirect,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constants';

// ✅ Loader: Get job details by ID
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    return data; // { job: {...} }
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Job not found');
    return redirect('/dashboard/all-jobs');
  }
};

// ✅ Action: Handle job update
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.patch(`/jobs/${params.id}`, data);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Failed to edit job');
    return null;
  }
};

const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            labelText="Job Position"
            defaultValue={job.position}
            required
          />
          <FormRow
            type="text"
            name="company"
            defaultValue={job.company}
            required
          />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="Job Location"
            defaultValue={job.jobLocation}
            required
          />

          <FormRowSelect
            name="jobStatus"
            labelText="Job Status"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
            required
          />
          <FormRowSelect
            name="jobType"
            labelText="Job Type"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
            required
          />

          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
