/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  BrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap-grid.min.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)
