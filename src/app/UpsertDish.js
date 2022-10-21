import React, { useState } from 'react';
import InputField from './InputField';
import FloatingCheckButton from './FloatingCheckButton';

const UpsertDish = ({ onUpsert, onCancel, initialName, initialLink, initialExtraInfo }) => {
  const [name, setName] = useState(initialName || '')
  const [link, setLink] = useState(initialLink || '')
  const [extraInfo, setExtraInfo] = useState(initialExtraInfo || '')
  const [error, setError] = useState('')

  const addNewItem = () => {
    if (name) {
      onUpsert(name, link, extraInfo);
      setError('')
    } else setError("Ange ett namn")
  }
  return (
     <div className="shopping-list-container">
       <div className="header-with-menu">
         <h1>{initialName ? 'Redigera rätt' : 'Ny rätt'}</h1>
         <span className={"cancel-x"} onClick={() => onCancel()}>X</span>
       </div>
       <div>
         <label><b>Namn:</b>
           <InputField
              onChange={setName}
              onItemSubmited={() => ''}
              hideArrow={true}
              defaultValue={initialName}/></label>
         <br/>
         <br/>
         <label><b>Länk?:</b>
           <InputField
              onChange={setLink}
              onItemSubmited={() => ''}
              hideArrow={true}
              defaultValue={initialLink}/>
         </label>
         <br/>
         <br/>
         <label><b>Extra info?:</b>
           <br/>
           <div className={"add-dish-text-area"}>
             <textarea
                onChange={e => setExtraInfo(e.target.value)}
                rows={10}
                style={{ width: '100%', marginTop: '8px' }}
                defaultValue={initialExtraInfo}/>
           </div>
         </label>
       </div>
       <div>{error && <p className="shopping-list-error-text">{error}</p>}</div>
       <FloatingCheckButton onClick={() => addNewItem()}/>

     </div>
  );
};

export default UpsertDish;