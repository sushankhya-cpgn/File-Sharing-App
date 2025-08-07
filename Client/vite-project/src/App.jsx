import React, {useState} from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TransferReceiverPage from './pages/TransferReceiverPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import "./App.css"

function App(){
const router = createBrowserRouter([
  {
    path:'/',
    element:<TransferReceiverPage/>
  },
  {
    path:'/login', 
    element:<Login/>
  }
  ,
  {
    path:'*',
    element:<NotFound/>
  }
])

return <RouterProvider router={router}/>

}


export default App;
