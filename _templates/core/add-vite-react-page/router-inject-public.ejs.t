---
inject: true
to: "<%= auth === 'public' ? `apps/${service}/src/router/Router/Router.tsx` : null%>"
after: <Routes>
---
      <Route
        path={paths.<%=h.changeCase.upper(h.changeCase.snake(page))%>_PATH}
        element={
          <PublicRoute>
            <<%=h.capitalize(h.changeCase.camel(page))%> />
          </PublicRoute>
        }
      />