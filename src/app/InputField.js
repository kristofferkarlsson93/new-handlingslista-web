import React, { useState } from 'react';

const InputField = (props) => {
  const [item, setItem] = useState('')

  const onKeyStroke = (e) => {
    setItem(e.target.value);
    props.onChange && props.onChange(e.target.value)
  }
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
         <input type="text" value={item} onChange={e => onKeyStroke(e)} onKeyPress={e => submitOnEnter(e)}/>
       </div>

       <span className="highlight"/>
       <span className="bar"/>
     </div>
  );
};

export default InputField;