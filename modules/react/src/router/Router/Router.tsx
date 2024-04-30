import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicRoute } from '../PublicRoute';
import { PrivateRoute } from '../PrivateRoute';

type Props = {
  routes: {
    component: React.ReactNode;
    path: string;
    access: 'public' | 'private';
    redirectTo?: string;
  }[];
};

function Router({ routes }: Props) {
  return (
    <Routes>
      {routes.map((route) => {
        if (route.access === 'public') {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<PublicRoute>{route.component}</PublicRoute>}
            />
          );
        }

        if (route.access === 'private') {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute redirectTo={route.redirectTo}>
                  {route.component}
                </PrivateRoute>
              }
            />
          );
        }
      })}
    </Routes>
  );
}

export default Router;
