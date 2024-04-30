import * as React from 'react';
import Button from '@mui/joy/Button';
import { Input } from '@mui/joy';
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
declare const EmailLoginForm: ({ onSubmit, inputStyle, buttonStyle, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, buttonText, }: Props) => React.JSX.Element;
export default EmailLoginForm;
