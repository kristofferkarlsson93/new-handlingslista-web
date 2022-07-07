import React, { useState } from 'react';
import InputField from './InputField';

const AddDish = ({ onDishAdded, onCancel }) => {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  const addNewItem = () => {
    if (name) {
      onDishAdded(name, link);
      setError('')
    } else setError("Ange ett namn")
  }
  return (
     <div className="shopping-list-container">
       <div className="header-with-menu">
         <h1>Ny rätt</h1>
         <span className={"cancel-x"} onClick={() => onCancel()}>X</span>
       </div>
       <div>
         <label><b>Namn:</b> <InputField onChange={setName} onItemSubmited={() => ''}/></label>
         <br/>
         <br/>
         <label><b>Länk?:</b> <InputField onChange={setLink} onItemSubmited={() => ''}/></label>
       </div>
       <div>{error && <p>{error}</p>}</div>
       <div className="add-dish-button-container">
         <button className="add-dish-button" onClick={() => addNewItem()}>Lägg till</button>
       </div>

     </div>
  );
};

export default AddDish;