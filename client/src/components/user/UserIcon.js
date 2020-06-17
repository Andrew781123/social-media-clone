import React from "react";

const UserIcon = props => {
  const { size, headColor, bodyColor, handleClick } = props;

  return (
    <div
      className='icon'
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      <div className='head' style={{ backgroundColor: headColor }}></div>
      <div className='body' style={{ backgroundColor: bodyColor }}></div>
    </div>
  );
};

export default UserIcon;
