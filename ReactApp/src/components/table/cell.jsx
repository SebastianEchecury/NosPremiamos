import React from "react";

export default ({ children, ...props }) => {
  return (
    <td {...props}>{children}</td>
  );
};