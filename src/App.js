import React from 'react';
import './App.css';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase';
import { firebaseConfig } from './modules/firebase';
import ShoppingList from './app/ShoppingList';
import Dishes from './app/Dishes';
import { Tab, Tabs } from './app/Tabs';

function App() {
  return (
     <div className="App">
       <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
         <Tabs>
           <Tab label="Handlingslista">
             <ShoppingList/>
             </Tab>
           <Tab label="Maträtter">
             <Dishes />
           </Tab>
         </Tabs>
       </FirebaseDatabaseProvider>
     </div>
  );
}

export default App;
