---
to: apps/<%=service%>/src/pages/<%=h.capitalize(h.changeCase.camel(page))%>/index.ts
---
export { default as <%=h.capitalize(h.changeCase.camel(page))%> } from './<%=h.capitalize(h.changeCase.camel(page))%>'
