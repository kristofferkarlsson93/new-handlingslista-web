import React, { useState } from 'react';
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';
import LoadingScreen from './LoadingScreen';
import ShopingItem from './ShopingItem';
import InputField from './InputField';
import { groupByCategory } from './logic/ItemClassifier';

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

const categorySortOrder = [
  'Skafferi',
  'Kött',
  'Mejeri',
  'Frukt & grönt',
  'Övrigt'
]

const ShoppingList = () => {

  const [forceUpdateWhenChange, setForceUpdate] = useState(1);
  const [editId, setEditId] = useState(null);

  return (
     <div className={'shopping-list-container'} key={forceUpdateWhenChange}>
       <FirebaseDatabaseNode
          path="listItems"
       >
         {result => {
           if (!result.isLoading) {
             const allItems = result.value === null ? [] : Object.entries(result.value).map(([key, { item }]) => ({
               id: key,
               item
             }))
             const groupedItems = groupByCategory(allItems);
             const itemsByCategories = Object.entries(groupedItems).sort(([keyA, valueA], [keyB, valueB]) => categorySortOrder.indexOf(keyA) - categorySortOrder.indexOf(keyB));
             return (
                <div>{itemsByCategories.length && itemsByCategories.map(([category, items]) => {
                  return (<div key={category}>
                    <p className="shopping-list-category">{category}</p>
                    <div className="shopping-list-items-container">
                      {!!items.length && items.map((item) => {
                           return editId === item.id
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
                         }
                      )}
                    </div>
                  </div>)

                })}</div>
             )
           } else return <LoadingScreen/>;
         }}
       </FirebaseDatabaseNode>
       {!editId && <FirebaseDatabaseMutation type="push" path={'listItems'}>
         {({ runMutation }) => {
           return (
              <div className="input-field-container">
                <InputField onItemSubmited={item => runMutation({ item })}
                />
              </div>
           );
         }}
       </FirebaseDatabaseMutation>}
     </div>
  );
};

export default ShoppingList;