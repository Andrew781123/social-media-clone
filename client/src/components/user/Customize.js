import React from "react";
import IconPart from "./IconPart";

const headColors = [
  "#fc032c",
  "#3c00ff",
  "#00bd39",
  "#f2ff00",
  "#00ffb7",
  "#00ffb7",
  "#00ffb7",
  "#00ffb7",
  "#00ffb7"
];
const bodyColors = ["#fa00c0", "#00e5ff", "#ffbf00"];

const Customize = () => {
  return (
    <div className='color-options-container'>
      <IconPart part='head' colors={headColors} />
      <IconPart part='body' colors={bodyColors} />
    </div>
  );
};

export default Customize;
