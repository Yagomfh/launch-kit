import * as React from 'react';
import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '../../components';
import { CircularProgress } from '@mui/joy';

type Props = {
  children: ReactNode;
};

function PublicRoute(props: Props) {
  const { children } = props;

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<CircularProgress color="neutral" />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default PublicRoute;
