import React from "react";

function Typography({ children, className }) {
  return <p className={`${className}`}>{children}</p>;
}

export default Typography;
