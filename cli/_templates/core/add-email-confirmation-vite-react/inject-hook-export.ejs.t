---
inject: true
to: apps/<%=service%>/src/hooks/index.ts
skip_if: export * from './useEmailConfirmation'
at_line: 0
---
export * from './useEmailConfirmation'