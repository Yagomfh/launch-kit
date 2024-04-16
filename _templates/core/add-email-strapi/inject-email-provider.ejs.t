---
inject: true
to: apps/<%=service%>/config/plugins.ts
after: export default
skip_if: email
---
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: '<%=from%>',
        defaultReplyTo: '<%=replyTo%>',
        testAddress: '<%=test%>',
      },
    },
  },