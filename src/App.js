import React, { useState } from 'react';
import './App.css';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase';
import { firebaseConfig } from './modules/firebase';
import ShoppingList from './app/ShoppingList';
import Dishes from './app/Dishes';

function App() {
  const [activeTab, setActiveTab] = useState('shoppingList');
  return (
     <div className="App">
       <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
         {activeTab === 'shoppingList' ? <ShoppingList onMenuClick={() => setActiveTab('dishes')}/> :
            <Dishes onMenuClick={() => setActiveTab('shoppingList')}/>}
         {/*<BottomMenu onShoppingListClick={() => setActiveTab('shoppingList')} onRecepiesClick={() => setActiveTab('recepies')}/>*/}
       </FirebaseDatabaseProvider>
     </div>
  );
}

export default App;
