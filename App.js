import logo from './logo.svg';
import './App.css';
import React, {useContext} from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AdminPage from './Pages/AdminPage';
import VotePage from './Pages/VotingPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import BottomNav from './Components/BottomNav/BottomNav';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from './Utils/FirebaseConfig';
import {EthersContext} from './Context/EthersContext'
import Connect from './Pages/Connect'
function App() {
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const {Connected} = useContext(EthersContext)
  return (
    Connected?<div className="App">
    <Routes>
      <Route exact path='/' element={<LoginPage/>}></Route>
      <Route exact path='/signup' element={<SignUpPage/>}></Route>
      <Route exact path='/admin' element={<AdminPage/>}></Route>
    </Routes>
  </div>:<Connect></Connect>
  );
}

export default App;
