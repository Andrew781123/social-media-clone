import React, { useRef, useEffect, useState } from "react";

const ColorItem = props => {
  const { part, color, updateColor } = props;

  const [height, setHeight] = useState("0");

  const colorItem = useRef("0");

  useEffect(() => {
    setHeight(colorItem.current.clientWidth);
    const updateHeight = () => {
      setHeight(colorItem.current.clientWidth);
    };
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      ref={colorItem}
      className={`color ${part}-color`}
      style={{ backgroundColor: color, height: height }}
      onClick={() => updateColor(color)}
    ></div>
  );
};

export default ColorItem;
