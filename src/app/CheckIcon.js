import React from 'react';

const CheckIcon = () => {
  // Invert to make it white.
  return (
     <div style={{ filter: 'invert(100%)' }}>
       <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
         <path d="m9.55 18-5.7-5.7 1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4Z"/>
       </svg>
     </div>
  );
};

export default CheckIcon;