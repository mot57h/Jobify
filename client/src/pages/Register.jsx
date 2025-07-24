// import { Logo,FormRow} from '../components';
// import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
// import { Link,Form} from 'react-router-dom';
// export const action = async ({request}) => {
//   const formData = await request.formData();
//   console.log(data);
//   return null;
// }

// const Register = () => {
//   return (
//     <Wrapper>
//        <Form method='post' className='form'>
//         <Logo />
//         <h4>Register</h4>
//         <FormRow type='text' name='name' />
//         <FormRow type='text' name='lastName' labelText='last name' />
//         <FormRow type='text' name='location' />
//         <FormRow type='email' name='email' />

//         <FormRow type='password' name='password' />
//         <button type='submit' className='btn btn-block'>
//           submit
//         </button>
//         <p>
//           Already a member?
//           <Link to='/login' className='member-btn'>
//             Login
//           </Link>
//         </p>
//       </Form>
//     </Wrapper>
//   );
// };
// export default Register;




// import { Logo, FormRow } from '../components';
// import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
// import { Link, Form, useNavigation, redirect } from 'react-router-dom';
// import customFetch from '../utils/customFetch'; // Make sure you have this import

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   try {
//     await customFetch.post('/auth/register', data);
//     return redirect('/login');
//   } catch (error) {
//     return error;
//   }
// };

// const Register = () => {
//   const navigation = useNavigation();
//   console.log(navigation);
//   const isSubmitting = navigation.state === 'submitting';

//   return (
//     <Wrapper>
//       <Form method='post' className='form'>
//         <Logo />
//         <h4>Register</h4>
//         <FormRow type='text' name='name' />
//         <FormRow type='text' name='lastName' labelText='last name' />
//         <FormRow type='text' name='location' />
//         <FormRow type='email' name='email' />
//         <FormRow type='password' name='password' />
//         <button type='submit' className='btn btn-block' disabled={isSubmitting}>
//           {isSubmitting ? 'submitting...' : 'submit'}
//         </button>
//         <p>
//           Already a member?
//           <Link to='/login' className='member-btn'>
//             Login
//           </Link>
//         </p>
//       </Form>
//     </Wrapper>
//   );
// };

// export default Register;



import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link, Form, useNavigation, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify'; // ✅ Toast import

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration successful'); // ✅ Success toast
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg || 'Registration failed'); // ✅ Error toast
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
        <p>
          Already a member?{' '}
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
