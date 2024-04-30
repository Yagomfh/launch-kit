import * as React from 'react';
import { AxiosInstance } from 'axios';
import { LaunchKitConfig } from '../LaunchKit/LaunchKitProvider';
type Props = {
    children: React.ReactNode;
    api: AxiosInstance;
} & LaunchKitConfig['auth'];
declare function AuthProvider(props: Props): React.JSX.Element;
export default AuthProvider;
