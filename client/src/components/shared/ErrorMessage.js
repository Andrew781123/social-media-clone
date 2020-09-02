import React from "react";
import "./error-message.css";
import { BiErrorCircle } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { AiOutlineClose } from "react-icons/ai";

const ErrorMessage = props => {
  const { errorMessage, setErrorMessage } = props;

  const handleErrorClose = () => {
    setErrorMessage(null);
  };

  if (errorMessage) {
    return (
      <div className='error-message-container'>
        <IconContext.Provider value={{ className: "error-message-icon" }}>
          <BiErrorCircle />
        </IconContext.Provider>
        <span className='error-message'>{errorMessage}</span>
        <IconContext.Provider
          value={{ className: "error-message-cancel-button" }}
        >
          <AiOutlineClose onClick={handleErrorClose} />
        </IconContext.Provider>
      </div>
    );
  } else {
    return null;
  }
};

export default ErrorMessage;
