---
inject: true
to: apps/<%=service%>/src/pages/index.ts
skip_if: export * from './<%=h.capitalize(page)%>'
at_line: 0
---
export * from './<%=h.capitalize(page)%>'