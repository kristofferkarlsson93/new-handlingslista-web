import React, { useState } from 'react';
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';
import LoadingScreen from './LoadingScreen';
import ShopingItem from './ShopingItem';
import InputField from './InputField';

/**
 * {
  "path": "listItems",
  "value": {
    "-MYpo6zMlytP-pRTrmN5": {
      "item": "Ost"
    },
    "-MYq4itGWha_pK5IGPl6": {
      "item": "Korv"
    }
  },
  "isLoading": false
}
 */


const ShoppingList = () => {

  const [forceUpdateWhenChange, setForceUpdate] = useState(1);
  const [editId, setEditId] = useState(null);

  return (
     <div className={'shopping-list-container'} key={forceUpdateWhenChange}>
       <h1>Handlingslista</h1>
       <FirebaseDatabaseNode
          path="listItems"
       >
         {result => {
           if (!result.isLoading) {
             const items = result.value === null ? [] : Object.entries(result.value).map(([key, { item }]) => ({
               id: key,
               item
             }))
             return (
                <div className="shopping-list-items-container">
                  {!!items.length && items.map((item) =>
                     editId === item.id
                        ?
                        <FirebaseDatabaseMutation key={item.id} path={`listItems/${item.id}`} type={'update'}>
                          {({ runMutation }) => {
                            return <ShopingItem
                               item={item}
                               onEditDone={(newText) => {
                                 runMutation(newText)
                                 setEditId(null)
                                 setForceUpdate(Math.floor(Math.random() * 100))
                               }}
                            />
                          }}
                        </FirebaseDatabaseMutation>
                        : <FirebaseDatabaseMutation key={item.id} path={`listItems/${item.id}`} type={'set'}>
                          {({ runMutation }) => (
                             <ShopingItem
                                item={item}
                                onRequestEdit={() => {
                                  setEditId(item.id)
                                  setForceUpdate(Math.floor(Math.random() * 100))
                                }}
                                onDelete={() => {
                                  runMutation(null)
                                  setForceUpdate(Math.floor(Math.random() * 100))
                                }}
                             />
                          )}
                        </FirebaseDatabaseMutation>
                  )}
                </div>
             )
           } else return <LoadingScreen/>;
         }}
       </FirebaseDatabaseNode>
       <FirebaseDatabaseMutation type="push" path={'listItems'}>
         {({ runMutation }) => {
           return (
              <div className="input-field-container">
                <InputField onItemSubmited={item => runMutation({ item })}
                />
              </div>
           );
         }}
       </FirebaseDatabaseMutation>
     </div>
  );
};

export default ShoppingList;