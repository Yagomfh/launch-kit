import { ReactNode, Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorState, Loader } from '@/components'
import { useSession } from '@/hooks'

type Props = {
  redirectTo?: string
  children: ReactNode
}

function PrivateRoute(props: Props) {
  const { redirectTo = '/login', children } = props

  const { isAuthenticated, loadingUserData, user } = useSession()

  if (loadingUserData) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />
  }

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  )
}

export default PrivateRoute
