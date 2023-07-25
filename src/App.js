
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Register from './Pages/Register';
import Login from './Pages/Login';
import SetAvatar from './Pages/SetAvatar';
import Mainpage from './Pages/Mainpage';
import List from './Pages/List';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/setavatar' element={<SetAvatar/>} />
          <Route path='/main' element={<Mainpage/>} />
          <Route path='/list' element={<List/>} />
      </Routes>
    </BrowserRouter>
  )
}


