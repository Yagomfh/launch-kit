// @ts-ignore
import * as React from 'react';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';
import {
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ComponentProps, FC, useState } from 'react';

interface Props {
  formLabel?: string;
  errorMsg?: string;
  isValid?: boolean;
}

const PasswordInput: FC<Props & ComponentProps<typeof Input>> = props => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl {...(props.isValid && { isInvalid: props.isValid })}>
      {props.formLabel && <FormLabel>{props.formLabel}</FormLabel>}
      <InputGroup size="md">
        <Input
          size="md"
          variant="filled"
          focusBorderColor="brand.200"
          placeholder="password"
          {...props}
          type={show ? 'text' : 'password'}
        />
        <InputRightElement>
          <IconButton
            isRound={true}
            aria-label="View password"
            variant="ghost"
            size="sm"
            colorScheme="brand"
            onClick={handleClick}
            icon={show ? <ViewOffIcon /> : <ViewIcon />}
          />
        </InputRightElement>
      </InputGroup>
      {props.errorMsg && <FormErrorMessage>{props.errorMsg}</FormErrorMessage>}
    </FormControl>
  );
};

export default PasswordInput;
