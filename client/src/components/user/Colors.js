import React from "react";
import ColorItem from "./ColorItem";

const Colors = props => {
  const { part, colors } = props;

  return (
    <div className={`${part}-colors`}>
      {colors.map(color => (
        <ColorItem part={part} color={color} />
      ))}
    </div>
  );
};

export default Colors;
