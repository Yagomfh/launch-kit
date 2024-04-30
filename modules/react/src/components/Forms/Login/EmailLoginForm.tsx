import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/joy/Button';
import { Navigate } from 'react-router-dom';
import { FormControl, FormHelperText, FormLabel, Input, Stack } from '@mui/joy';
import PasswordInput from '../../Inputs/Password';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Required'),
});

type LoginPayload = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (values: LoginPayload) => Promise<void>;
  inputProps?: React.ComponentProps<typeof Input>;
  buttonProps?: React.ComponentProps<typeof Button>;
  emailLabel?: string;
  passwordLabel?: string;
  buttonText: string;
  redirectTo: string;
};

const EmailLoginForm = ({
  onSubmit,
  inputProps,
  buttonProps,
  emailLabel,
  passwordLabel,
  buttonText,
  redirectTo,
}: Props) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: LoginPayload) => {
      setLoading(true);
      await onSubmit(values).finally(() => {
        setLoading(false);
        return <Navigate to={redirectTo} />;
      });
    },
    validationSchema: LoginSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <FormControl error={!!formik.errors.email && formik.touched.email}>
          {emailLabel && <FormLabel>{emailLabel}</FormLabel>}
          <Input
            {...inputProps}
            id="email"
            name="email"
            type="email"
            defaultValue={formik.values.email}
            onChange={formik.handleChange}
          />
          <FormHelperText>{formik.errors.email}</FormHelperText>
        </FormControl>
        <FormControl
          error={!!formik.errors.password && formik.touched.password}
        >
          {passwordLabel && <FormLabel>{passwordLabel}</FormLabel>}
          <PasswordInput
            {...inputProps}
            id="password"
            name="password"
            defaultValue={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormHelperText>{formik.errors.password}</FormHelperText>
        </FormControl>
        <Button {...buttonProps} type="submit" loading={loading}>
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
};

export default EmailLoginForm;
