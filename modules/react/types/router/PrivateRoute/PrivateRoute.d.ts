import * as React from 'react';
import { ReactNode } from 'react';
type Props = {
    redirectTo?: string;
    children: ReactNode;
};
declare function PrivateRoute(props: Props): React.JSX.Element | null;
export default PrivateRoute;
