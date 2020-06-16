import React from "react";
import Colors from "./Colors";

const IconPart = props => {
  const { part, colors } = props;

  return (
    <div className={`${part}-container`}>
      <h1>Edit {part}</h1>
      <Colors part={part} colors={colors} />
    </div>
  );
};

export default IconPart;
