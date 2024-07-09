import React, { useState } from 'react';
import { FirebaseDatabaseMutation, FirebaseDatabaseNode } from '@react-firebase/database';
import LoadingScreen from './LoadingScreen';
import ShopingItem from './ShopingItem';
import InputField from './InputField';

const OtherList = () => {
  const [forceUpdateWhenChange, setForceUpdate] = useState(1);

  return (
     <div className="shopping-list-container" key={forceUpdateWhenChange}>
       <FirebaseDatabaseNode path={'otherItems'}>{result => {
         if (result.isLoading) {
           return <LoadingScreen/>
         } else {
           const items = result.value === null ? [] : Object.entries(result.value).map(([key, { item }]) => ({
             id: key,
             item
           }));
           return (
              <div>
                <p className="other-list-instructions">Här kan man lägga till sånt som ska köpas i kommande beställningar, eller på tex Byggmax.</p>
                {!!items.length && items.map(item => {
                  return (<FirebaseDatabaseMutation key={item.id} path={`otherItems/${item.id}`} type={'set'}>
                    {({ runMutation }) => (
                       <ShopingItem
                          item={item}
                          onDelete={() => {
                            runMutation(null)
                            setForceUpdate(Math.floor(Math.random() * 100))
                          }}
                       />
                    )}
                  </FirebaseDatabaseMutation>)
                })}
              </div>
           )
         }

       }}</FirebaseDatabaseNode>
       <div className="add-other-item-input-container">
         <FirebaseDatabaseMutation path={'otherItems'} type="push">
           {({ runMutation }) => {
             return (
                <div className="input-field-container">
                  <InputField
                     onItemSubmited={item => runMutation({ item })}
                  />
                </div>
             );
           }}
         </FirebaseDatabaseMutation>
       </div>
     </div>
  );
};

export default OtherList;