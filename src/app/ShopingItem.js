import React, { useState, useEffect } from 'react';

const ShopingItem = ({ item, onDelete, onRequestEdit, onEditDone }) => {
  const deleteItem = () => {
    setTimeout(() => {
      onDelete()
    }, 300)
  }
  const [newItemText, setNewItemText] = useState(item.item)
  const [isClicked, setIsClicked] = useState(false)
  const isEditMode = !!onEditDone

  const focusRef = React.createRef();

  const submitOnEnter = (e) => {
    if (e.key === 'Enter') {
      onEditDone({ item: newItemText });
      setNewItemText('');
      setIsClicked(false)
    }
  }

  const editOnDoubleClick = () => {
    if (isClicked) {
      onRequestEdit();
      setIsClicked(false)
    } else {
      setIsClicked(true);
    }
  }

  useEffect(() => {
    if (isEditMode) {
      focusRef.current.focus();
    }
  }, [onEditDone, focusRef, isEditMode])

  return (
     <div className="shopping-item-container">
       <div className={"shopping-item-checkbox-container"}>
         <input className="item-checkbox" type={'checkbox'} onChange={() => deleteItem()} disabled={isEditMode}/>
       </div>
       {
         isEditMode
            ? <div>
              <input
                 ref={focusRef}
                 type="text"
                 value={newItemText}
                 onChange={(e) => setNewItemText(e.target.value)}
                 onKeyPress={e => submitOnEnter(e)}
                 className="edit-input"
              />
            </div>
            : <div onClick={() => editOnDoubleClick()} className="shopping-list-item-text">
              {item.item}
            </div>}
     </div>
  );
};

export default ShopingItem;