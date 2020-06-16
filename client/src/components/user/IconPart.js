import React from "react";
import Colors from "./Colors";

const IconPart = props => {
  const { part, colors, updateColor } = props;

  return (
    <div className={`${part}-container`}>
      <h1>Edit {part}</h1>
      <Colors part={part} colors={colors} updateColor={updateColor} />
    </div>
  );
};

export default IconPart;
