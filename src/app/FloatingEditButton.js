import React from 'react';
import EditIcon from './EditIcon';

const FloatingEditButton = (props) => {
  return (
     <span className="floating-button floating-edit-button" onClick={() => props.onClick()}>
       <span className="my-float"><EditIcon/></span>
     </span>
  );
};

export default FloatingEditButton;