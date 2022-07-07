import React from 'react';

const DishListItem = ({ dish }) => {

  const goToDish = () => {
    if (dish.maybeLink) {
      window.open(dish.maybeLink, '_blank')
    }
  }
  return (
     <div onClick={() => goToDish()}>
       <div className="dish-list-item">
         <span>{dish.dishName}</span>
         {dish.maybeLink && <span className="dish-list-link-symbol"> > </span>}
       </div>
       <hr/>
     </div>
  );
};

export default DishListItem;