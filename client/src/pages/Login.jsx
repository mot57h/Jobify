// import { Logo, FormRow } from '../components';
// import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

// import { Link } from 'react-router-dom';

// const Login = () => {
//   return (
//     <Wrapper>
//       <form className='form'>
//         <Logo />
//         <h4>Login</h4>
//         <FormRow type='email' name='email' defaultValue='john@gmail.com' />
//         <FormRow type='password' name='password' defaultValue='secret123' />
//         <button type='submit' className='btn btn-block'>
//           submit
//         </button>
//         <button type='button' className='btn btn-block'>
//           explore the app
//         </button>
//         <p>
//           Not a member yet?
//           <Link to='/register' className='member-btn'>
//             Register
//           </Link>
//         </p>
//       </form>
//     </Wrapper>
//   );
// };
// export default Login;

import { Form, redirect, useActionData, useNavigation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };

  if (data.password.length < 3) {
    errors.msg = 'Password too short';
    return errors;
  }

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    errors.msg = error?.response?.data?.msg || 'Login failed';
    return errors;
  }
};

const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        {errors?.msg && <p style={{ color: 'red', marginBottom: '1rem' }}>{errors.msg}</p>}
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'logging in...' : 'login'}
        </button>
        <p>
          Not a member yet?{' '}
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
