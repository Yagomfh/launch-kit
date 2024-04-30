import { Input } from '@mui/joy';
import * as React from 'react';
import { FC } from 'react';
interface Props {
    id?: string;
    name?: string;
    placeholder?: string;
    variant?: React.ComponentProps<typeof Input>['variant'];
    color?: React.ComponentProps<typeof Input>['color'];
    size?: React.ComponentProps<typeof Input>['size'];
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
declare const PasswordInput: FC<Props>;
export default PasswordInput;
