import React, { useState } from 'react';
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';
import LoadingScreen from './LoadingScreen';
import FloatingAddButton from './FloatingAddButton';
import AddDish from './AddDish';
import DishListItem from './DishListItem';
import MenuIcon from './MenuIcon';

const Dishes = ({ onMenuClick }) => {
  const DISHES_PATH = "dishes";
  const [showAddDishPage, setShowAddDish] = useState(false);

  const createNewDish = (runMutation, name, link) => {
    runMutation({ dishName: name, maybeLink: link })
    setShowAddDish(false);
  }

  if (showAddDishPage) {
    return <div>
      <FirebaseDatabaseMutation type="push" path={DISHES_PATH}>
        {({ runMutation }) => {
          return (
             <AddDish onDishAdded={(name, link) => createNewDish(runMutation, name, link)} onCancel={() => setShowAddDish(false)}/>
          );
        }}
      </FirebaseDatabaseMutation>
    </div>
  }
  return (
     <div className="shopping-list-container">
       <div className="header-with-menu">
         <h1>Maträtter</h1>
         <MenuIcon onMenuClick={onMenuClick}/>
       </div>
       <FirebaseDatabaseNode path={DISHES_PATH}>{result => {
         if (!result.isLoading) {
           const dishes = result.value === null ? [] : Object.entries(result.value).map(([key, {
             dishName,
             maybeLink
           }]) => ({
             id: key,
             dishName,
             maybeLink
           })).filter(d => !!d.dishName) // remove scrap
           return dishes.map((dish, i) => {
                return <DishListItem key={i} dish={dish}/>
              }
           )
         } else {
           return <LoadingScreen/>
         }
       }
       }</FirebaseDatabaseNode>

       <FloatingAddButton onClick={() => setShowAddDish(true)}/>
     </div>
  );
};

export default Dishes;