---
inject: true
to: apps/<%=service%>/src/router/paths/paths.ts
skip_if: <%=h.changeCase.upper(h.changeCase.snake(page))%>,
after: const paths = {
---
  <%=h.changeCase.upper(h.changeCase.snake(page))%>_PATH,