---
inject: true
to: "<%= auth === 'public' ? null : `apps/${service}/src/router/Router/Router.tsx`%>"
after: <Routes>
---
      <Route
        path={paths.<%=h.changeCase.upper(h.changeCase.snake(page))%>_PATH}
        element={
          <PrivateRoute redirectTo={paths.LOGIN_PATH}>
            <<%=h.capitalize(h.changeCase.camel(page))%> />
          </PrivateRoute>
        }
      />