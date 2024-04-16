---
inject: true
to: apps/<%=service%>/src/pages/Login/Login.tsx
skip_if: useEmailConfirmation()
after: function Login() {
---
useEmailConfirmation()
