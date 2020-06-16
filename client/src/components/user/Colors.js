import React from "react";
import ColorItem from "./ColorItem";

const Colors = props => {
  const { part, colors, updateColor } = props;

  return (
    <div className={`${part}-colors`}>
      {colors.map((color, index) => (
        <ColorItem
          key={index}
          part={part}
          color={color}
          updateColor={updateColor}
        />
      ))}
    </div>
  );
};

export default Colors;
