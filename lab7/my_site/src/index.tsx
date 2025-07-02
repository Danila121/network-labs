import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";
import MainPage from './main/Main';
import List from './list/List';
import Chart from './chart/chart';
import Car from './car/Car'

const router = createBrowserRouter([
 {
  path: "",
  element: <MainPage />,
 },
 {
 path: "/list",
 element: <List />,
 },
 { path: 'Car/:id',
  element: <Car /> 
 },
 {
  path:"/chart",
  element:<Chart />
 }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
