import { Routes, Route } from 'react-router-dom'
import { useRoutePaths } from '@/hooks'
import { Home, Login, Settings, Register, Return, Checkout } from '@/pages'
import { PrivateRoute } from '../PrivateRoute'
import { PublicRoute } from '../PublicRoute'

function Router() {
  const paths = useRoutePaths()

  return (
    <Routes>
      <Route
        path={paths.ROOT_PATH}
        element={
          <PrivateRoute redirectTo={paths.LOGIN_PATH}>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path={paths.CHECKOUT_PATH}
        element={
          <PrivateRoute redirectTo={paths.LOGIN_PATH}>
            <Checkout />
          </PrivateRoute>
        }
      />

      <Route
        path={paths.RETURN_PATH}
        element={
          <PrivateRoute redirectTo={paths.LOGIN_PATH}>
            <Return />
          </PrivateRoute>
        }
      />

      <Route
        path={paths.LOGIN_PATH}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path={paths.REGISTER_PATH}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path={paths.SETTINGS_PATH}
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  )
}

export default Router
