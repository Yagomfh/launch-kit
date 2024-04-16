---
inject: true
to: apps/<%=service%>/src/router/paths/paths.ts
skip_if: const <%=h.changeCase.upper(h.changeCase.snake(page))%>_PATH = '<%=path%>'
at_line: 0
---
const <%=h.changeCase.upper(h.changeCase.snake(page))%>_PATH = '<%=path%>'