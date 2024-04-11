---
inject: true
to: apps/<%=service%>/src/router/paths/paths.ts
skip_if: const <%=h.changeCase.upper(page)%> = '<%=path%>'
at_line: 0
---
const <%=h.changeCase.upper(page)%> = '<%=path%>'