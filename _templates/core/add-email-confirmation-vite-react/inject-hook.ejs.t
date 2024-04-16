---
inject: true
to: apps/<%=service%>/src/pages/Login/Login.tsx
skip_if: useEmailConfirmation()
before: return (
---

useEmailConfirmation()
