import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  FormControl,
  Input,
  Button,
  VStack,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
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
  rememberMe: boolean;
};

type Props = {
  onSubmit: (values: LoginPayload) => Promise<void>;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  buttonText: string;
};

const EmailLoginForm = ({
  onSubmit,
  emailLabel,
  emailPlaceholder,
  passwordLabel,
  passwordPlaceholder,
  buttonText,
}: Props) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
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
      <VStack gap={4}>
        <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
          <FormLabel>{emailLabel}</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            variant="filled"
            placeholder={emailPlaceholder}
            focusBorderColor="brand.200"
            onChange={formik.handleChange}
            value={formik.values.email}
            size="md"
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <PasswordInput
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={passwordPlaceholder}
          formLabel={passwordLabel}
          errorMsg={formik.errors.password}
          isValid={!!formik.errors.password && formik.touched.password}
        />
        <Button
          type="submit"
          width="full"
          mt={4}
          colorScheme="brand"
          isLoading={loading}
        >
          {buttonText}
        </Button>
      </VStack>
    </form>
  );
};

export default EmailLoginForm;
