---
inject: true
to: apps/<%=service%>/src/router/paths/paths.ts
skip_if: <%=h.changeCase.upper(page)%>,
after: const paths = {
---
  <%=h.changeCase.upper(page)%>,