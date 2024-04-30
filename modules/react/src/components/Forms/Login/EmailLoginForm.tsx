import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/joy/Button';
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
  inputStyle: {
    variant?: React.ComponentProps<typeof Input>['variant'];
    color?: React.ComponentProps<typeof Input>['color'];
    size?: React.ComponentProps<typeof Input>['size'];
  };
  buttonStyle: {
    variant?: React.ComponentProps<typeof Button>['variant'];
    color?: React.ComponentProps<typeof Button>['color'];
    size?: React.ComponentProps<typeof Button>['size'];
  };
  emailLabel?: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  buttonText: string;
};

const EmailLoginForm = ({
  onSubmit,
  inputStyle,
  buttonStyle,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  buttonText,
}: Props) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: 'test@email.com',
      password: 'Test@123456789',
    },
    onSubmit: async (values: LoginPayload) => {
      setLoading(true);
      await onSubmit(values);
      setLoading(false);
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
            id="email"
            name="email"
            type="email"
            {...inputStyle}
            placeholder={emailPlaceholder}
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
            id="password"
            name="password"
            {...inputStyle}
            placeholder={passwordPlaceholder}
            defaultValue={formik.values.password}
            onChange={formik.handleChange}
          />
          <FormHelperText>{formik.errors.password}</FormHelperText>
        </FormControl>
        <Button type="submit" loading={loading} {...buttonStyle}>
          {buttonText}
        </Button>
      </Stack>
    </form>
  );
};

export default EmailLoginForm;
