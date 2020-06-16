import React from "react";
import IconPart from "./IconPart";
import { connect } from "react-redux";
import {
  updateHeadColor,
  updateBodyColor
} from "../../Redux/actions/authActions";

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
