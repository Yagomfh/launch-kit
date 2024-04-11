---
inject: true
to: "<%= auth === 'public' ? `apps/${service}/src/router/Router/Router.tsx` : null%>"
after: <Routes>
---
      <Route
        path={paths.<%=h.changeCase.upper(page)%>}
        element={
          <PublicRoute>
            <<%=h.capitalize(page)%> />
          </PublicRoute>
        }
      />