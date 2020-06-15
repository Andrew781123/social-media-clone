import React from "react";

const CreatedTime = props => {
  const { createdAt } = props;

  return <p className='post-item-data'>{createdAt}</p>;
};

export default CreatedTime;
