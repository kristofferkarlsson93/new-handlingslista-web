import React, { useState } from 'react';

const InputField = (props) => {
  const [item, setItem] = useState('')
  const submitOnEnter = (e) => {
    if (e.key === 'Enter') {
      props.onItemSubmited(item);
      setItem('')
    }
  }
  return (
     <div className="input-field-group-container">
       <div className="input-container">
       <span className="input-arrow">
         >
       </span>
         <input type="text" value={item} onChange={e => setItem(e.target.value)} onKeyPress={e => submitOnEnter(e)}/>
       </div>

       <span className="highlight"/>
       <span className="bar"/>
     </div>
  );
};

export default InputField;