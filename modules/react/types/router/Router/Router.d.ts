import * as React from 'react';
type Props = {
    routes: {
        component: React.ReactNode;
        path: string;
        access: 'public' | 'private';
        redirectTo?: string;
    }[];
};
declare function Router({ routes }: Props): React.JSX.Element;
export default Router;
