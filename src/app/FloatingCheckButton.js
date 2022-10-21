import React from 'react';
import CheckIcon from './CheckIcon';

const FloatingCheckButton = (props) => {
  return (
     <span className="floating-button floating-add-button" onClick={() => props.onClick()}>
       <span className="my-float"><CheckIcon/></span>
     </span>
  );
};

export default FloatingCheckButton;