import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const renderFunction = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <App />
      },
      {
        path: "/home",
        element: <App />
      },
      {
        path: "/about",
        element: <App />
      },
      {
        path: "/contact",
        element: <App />
      },
      {
        path: "/dashboard", 
        element: <App />
      }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        loader: redirectIfUser,
      },
      {
        path: "logout",
        action: logoutUser,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={renderFunction} />
)
