---
inject: true
to: apps/<%=service%>/src/pages/Login/Login.tsx
skip_if: import { useEmailConfirmation } from '@/hooks'
at_line: 0
---
import { useEmailConfirmation } from '@/hooks'