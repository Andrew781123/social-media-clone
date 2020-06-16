import React from "react";

const UserIcon = props => {
  const { size, headColor, bodyColor } = props;

  return (
    <div className='icon' style={{ width: size, height: size }}>
      <div className='head' style={{ backgroundColor: headColor }}></div>
      <div className='body' style={{ backgroundColor: bodyColor }}></div>
    </div>
  );
};

export default UserIcon;
