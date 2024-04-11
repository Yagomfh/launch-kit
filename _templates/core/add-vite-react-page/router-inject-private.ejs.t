---
inject: true
to: "<%= auth === 'public' ? null : `apps/${service}/src/router/Router/Router.tsx`%>"
after: <Routes>
---
      <Route
        path={paths.<%=h.changeCase.upper(page)%>}
        element={
          <PrivateRoute redirectTo={paths.LOGIN_PATH}>
            <<%=h.capitalize(page)%> />
          </PrivateRoute>
        }
      />