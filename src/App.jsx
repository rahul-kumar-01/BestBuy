import { useState } from 'react'
import style from './App.module.css'
import Navbar from './Component/Navbar/Navbar';
import SignIn from './Component/SignIn/SignIn';
import SignUp from './Component/SignUp/SignUp';
import ItemList from './Component/ItemList/ItemList';
import ItemDetails from './Component/ItemDetails/ItemDetails';
import CartItems from './Component/CartItems/CartItems';
import Orders from './Component/Orders/Orders';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {db} from './Config/firebaseConfig';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Navbar />,
//     children: [
//       { path: 'signIn', element: <SignIn /> },
//       { path: 'signUp', element: <SignUp /> },
//       { path: 'items', element: <ItemList /> },
//       { path: 'items/:id', element: <ItemDetails /> },
//     ],
//   },
// ]);



function App() {
  
  return (
    <>
    <Provider store={store}>

     <div className={style.main}>
      {/* <RouterProvider router={router}> */}

      <Router>
        <Navbar/> 
        <Routes>
          <Route path= "" element= {<ItemList/>} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="cart" element={<CartItems />} />
          <Route path="orders" element={<Orders/> } />
          <Route path="items/:id" element={<ItemDetails />} />
        </Routes>
      </Router>

      {/* </RouterProvider> */}
     </div>

     </Provider>
    
    </>
  )
}

export default App;
