import React, { useState } from 'react';
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';
import LoadingScreen from './LoadingScreen';
import FloatingAddButton from './FloatingAddButton';
import UpsertDish from './UpsertDish';
import DishListItem from './DishListItem';
import MenuIcon from './MenuIcon';
import DishDetails from './DishDetails';

const Dishes = ({ onMenuClick }) => {
  const DISHES_PATH = "dishes";
  const [showAddDishPage, setShowAddDish] = useState(false);
  const [showEditDish, setShowEditDish] = useState(false)
  const [selectedDish, setSelectedDish] = useState(null)

  const createNewDish = (runMutation, name, link, extraInfo) => {
    runMutation({ dishName: name, maybeLink: link, extraInfo: extraInfo })
    setShowAddDish(false);
  }
  const editDish = (runMutation, name, link, extraInfo) => {
    runMutation({ dishName: name, maybeLink: link, extraInfo: extraInfo })
    setShowEditDish(false);
    setSelectedDish({ dishName: name, maybeLink: link, extraInfo })
  }

  const openDishDetails = (dish) => {
    setSelectedDish(dish);
  }

  if (showAddDishPage) {
    return <div>
      <FirebaseDatabaseMutation type="push" path={DISHES_PATH}>
        {({ runMutation }) => {
          return (
             <UpsertDish
                onUpsert={(name, link, extraInfo) => createNewDish(runMutation, name, link, extraInfo)}
                onCancel={() => setShowAddDish(false)}/>
          );
        }}
      </FirebaseDatabaseMutation>
    </div>
  } else if (showEditDish) {
    return (<div>
      <FirebaseDatabaseMutation type="update" path={DISHES_PATH + `/${selectedDish.id}`}>
        {({ runMutation }) => {
          return (
             <UpsertDish
                initialName={selectedDish.dishName}
                initialLink={selectedDish.maybeLink}
                initialExtraInfo={selectedDish.extraInfo}
                onUpsert={(name, link, extraInfo) => editDish(runMutation, name, link, extraInfo)}
                onCancel={() => setShowEditDish(false)}/>
          );
        }}
      </FirebaseDatabaseMutation>
    </div>);
  } else if (selectedDish) {
    return (
       <div>
         <DishDetails
            dish={selectedDish}
            onCancel={() => setSelectedDish(null)}
            onEditClick={() => setShowEditDish(true)}/>
       </div>
    );
  } else {
    return (
       <div className="shopping-list-container">
         <div className="header-with-menu">
           <h1>Maträtter</h1>
           <MenuIcon onMenuClick={onMenuClick}/>
         </div>
         <FirebaseDatabaseNode path={DISHES_PATH}>{result => {
           if (!result.isLoading) {
             const dishes = result.value === null ? [] : Object.entries(result.value).map(([key, value]) => ({
               id: key,
               dishName: value.dishName,
               maybeLink: value.maybeLink,
               extraInfo: value.extraInfo
             })).filter(d => !!d.dishName) // remove scrap
             return dishes.map((dish, i) => {
                  return <DishListItem key={i} dish={dish} onDishClick={() => openDishDetails(dish)}/>
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
  }
};

export default Dishes;