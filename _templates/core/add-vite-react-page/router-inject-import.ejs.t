---
inject: true
to: apps/<%=service%>/src/router/Router/Router.tsx
skip_if: import { <%=h.capitalize(h.changeCase.camel(page))%> } from '@/pages'
at_line: 0
---
import { <%=h.capitalize(h.changeCase.camel(page))%> } from '@/pages'