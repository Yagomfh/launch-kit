---
to: <%=app%>/apps/<%=service%>/.env
---
HOST=0.0.0.0
PORT=3000
APP_KEYS=<%=APP_KEYS%>
API_TOKEN_SALT=<%=API_TOKEN_SALT%>
ADMIN_JWT_SECRET=<%=ADMIN_JWT_SECRET%>
TRANSFER_TOKEN_SALT=<%=TRANSFER_TOKEN_SALT%>
# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=<%=JWT_SECRET%>