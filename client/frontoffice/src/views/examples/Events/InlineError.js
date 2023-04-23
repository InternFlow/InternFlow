import React from "react";

function InlineError({ error }) {
  const paragraphStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "red",
    textAlign: "justify",
    margin: "0",
    padding: "0",
  };
  return <p style={paragraphStyle}>{error}</p>;
}

export default InlineError;
// className="my-1 text-sm text-green-600 font-subMain font-medium"
