import React from 'react';
import FloatingEditButton from './FloatingEditButton';

// Hack to get around invalid url
const getUrl = (text) => {
  try {
    const url = new URL(text)
    return url
  } catch {
    return ''
  }
}

const DishDetails = ({ dish, onCancel, onEditClick }) => {
  const maybeHost = !!dish.maybeLink && getUrl(dish.maybeLink).host
  return (
     <div className="shopping-list-container">
       <div className="header-with-menu">
         <h1>{dish.dishName}</h1>
         <span className={"cancel-x"} onClick={() => onCancel()}>X</span>
       </div>
       <div className="dish-details-container">
         <div className="dish-details-link">
           {!!dish.maybeLink ?
              <div><a href={dish.maybeLink} target="_blank" rel="noreferrer">Gå till receptet hos {maybeHost}</a>
              </div> :
              <div><i>Ingen länk</i></div>}
         </div>
         <div>
           {!!dish.extraInfo && <div className="dish-details-extra-info">
             {dish.extraInfo}
           </div>}
         </div>
       </div>
       <FloatingEditButton onClick={() => onEditClick()}/>
     </div>
  );
};

export default DishDetails;