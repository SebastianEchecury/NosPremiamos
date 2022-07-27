import React from "react";

export default ({ children, ...props }) => {
  return (
    <tr {...props}>{children}</tr>
  );
};