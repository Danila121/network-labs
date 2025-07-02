import React from 'react';
import ReactDOM from 'react-dom/client';
import  Building  from "./building/Building";
import Chart from "./chart/Chart";
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";

import List from "./list/List";
import Main from "./main/Main";
const router = createBrowserRouter([
 {
 path: "",
 element: <Main />,
 },
 {
 path: "/list",
 element: <List />,
 },
 { path: 'building/:id',
  element: <Building /> 
 },
 {
  path:"/charts",
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