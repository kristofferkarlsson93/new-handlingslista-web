import React from 'react';

const FloatingAddButton = (props) => {
  return (
     <span className="floating-add-button" onClick={() => props.onClick()}>
       <span className="my-float">+</span>
     </span>
  );
};

export default FloatingAddButton;