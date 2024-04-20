import React, {Component} from "react";
import ReactDom from "react-dom/client";
import logo from './logo.svg';
import {Outlet} from "react-router-dom";
import NavScrollExample from './comp/navbarcomp';
import './App.css';
import { useStore } from './store/apodLocalStore';

function App() {
  return (
    <div className="App">
      <NavScrollExample/>
      <Outlet/>
    </div>
  );
}

export default App;
