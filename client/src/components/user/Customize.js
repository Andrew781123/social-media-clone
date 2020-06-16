import React from "react";
import IconPart from "./IconPart";
import { connect } from "react-redux";
import {
  updateHeadColor,
  updateBodyColor
} from "../../Redux/actions/authActions";

const colors = [
  "#000000",
  "#ffffff",
  "#fc032c",
  "#3c00ff",
  "#00bd39",
  "#b1fc0f",
  "#f2ff00",
  "#00ffb7",
  "#e1c9f0",
  "#1c5391",
  "#1e6648",
  "#00ffb7",
  "#facfe5",
  "#00e5ff",
  "#14fff7",
  "#ffbf00",
  "#599977",
  "#75482e",
  "#75482e"
];

const headColors = colors;
const bodyColors = colors;

const Customize = props => {
  const { updateHeadColor, updateBodyColor } = props;

  return (
    <div className='color-options-container'>
      <IconPart part='head' colors={headColors} updateColor={updateHeadColor} />
      <IconPart part='body' colors={bodyColors} updateColor={updateBodyColor} />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  updateHeadColor: headColor => dispatch(updateHeadColor(headColor)),
  updateBodyColor: bodyColor => dispatch(updateBodyColor(bodyColor))
});

export default connect(null, mapDispatchToProps)(Customize);
