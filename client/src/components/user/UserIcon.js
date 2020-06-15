import React from "react";

const UserIcon = props => {
  const { size } = props;

  return (
    <div className='icon' style={{ width: size, height: size }}>
      <div className='head'></div>
      <div className='body'></div>
    </div>
  );
};

export default UserIcon;
