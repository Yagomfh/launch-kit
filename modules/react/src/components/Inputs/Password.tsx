// @ts-ignore
import { Input, IconButton } from '@mui/joy';
import * as React from 'react';
import { FC, useState } from 'react';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

interface Props {
  id?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const PasswordInput: FC<Props & React.ComponentProps<typeof Input>> = (
  props
) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Input
      {...props}
      type={show ? 'text' : 'password'}
      endDecorator={
        <IconButton variant="soft" onClick={handleClick}>
          {show ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
        </IconButton>
      }
    />
  );
};

export default PasswordInput;
