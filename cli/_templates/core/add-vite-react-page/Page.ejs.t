---
to: apps/<%=service%>/src/pages/<%=h.capitalize(h.changeCase.camel(page))%>/<%=h.capitalize(h.changeCase.camel(page))%>.tsx
---
const <%=h.capitalize(h.changeCase.camel(page))%> = () => {
  return (
    <div>
      <h1><%=h.capitalize(h.changeCase.camel(page))%></h1>
    </div>
  )
}

export default <%=h.capitalize(h.changeCase.camel(page))%>
