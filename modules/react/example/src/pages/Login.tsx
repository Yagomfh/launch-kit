import { EmailLoginForm, useSession } from '../../../.';
import { api } from '../services/api';

const Login = () => {
  const { createSession } = useSession();

  const login = async (values: { email: string; password: string }) => {
    const response = await api.post('/api/auth/local', {
      identifier: values.email,
      password: values.password,
    });

    createSession(response.data.jwt, response.data.user);
  };

  return (
    <EmailLoginForm
      onSubmit={login}
      inputProps={{
        variant: 'soft',
        color: 'neutral',
        size: 'md',
      }}
      buttonProps={{
        variant: 'solid',
        color: 'neutral',
        size: 'md',
      }}
      emailLabel="Email"
      passwordLabel="Password"
      buttonText="Login"
      redirectTo="/"
    />
  );
};

export default Login;
