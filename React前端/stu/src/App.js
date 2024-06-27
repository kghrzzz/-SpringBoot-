import './App.css';
import React from "react";
import {RouterProvider} from "react-router-dom";
import router from "./router";
//登录

function App() {

  return (
      <RouterProvider router={router} />
  );
}

export default App;
