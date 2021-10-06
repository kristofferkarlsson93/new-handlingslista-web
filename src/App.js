import React from 'react';
import './App.css';
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from 'firebase';
import { firebaseConfig } from './modules/firebase';
import ShoppingList from './app/ShoppingList';

function App() {
  return (
    <div className="App">
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <ShoppingList/>
      </FirebaseDatabaseProvider>
    </div>
  );
}

export default App;
