import * as React from 'react';
import { ReactNode, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorState } from '../../components';
import { CircularProgress } from '@mui/joy';
import { useSession } from '../../hooks';

type Props = {
  children: ReactNode;
};

function PublicRoute(props: Props) {
  const { children } = props;

  const { isAuthenticated } = useSession();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

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
