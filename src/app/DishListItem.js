import React from 'react';

const DishListItem = ({ dish, onDishClick }) => {
  return (
     <div onClick={() => onDishClick()}>
       <div className="dish-list-item">
         <span>{dish.dishName}</span>
         <span className="dish-list-link-symbol"> > </span>
       </div>
       <hr/>
     </div>
  );
};

export default DishListItem;