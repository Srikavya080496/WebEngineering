import React from "react";
import ReactDom from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import WithHeaderAndQuoteExample from './pages/home';
import Fetcher from './pages/form';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children : [
      {
        path:"home",
        element: <WithHeaderAndQuoteExample/>
      },
      {
        path:"fetch",
        element: <Fetcher/>
      },
    ]
  },
]);
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();