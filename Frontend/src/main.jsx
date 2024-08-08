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
import { Home } from './Pages/Home.jsx';
import { Signin } from './Components/Signin.jsx';
import { Signup } from './Components/Signup.jsx';


const renderFunction = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/signup",
        element: <Signup />
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
  // {
  //   element: <AuthLayout />,
  //   children: [
  //     {
  //       path: "login",
  //       element: <Login />,
  //       loader: redirectIfUser,
  //     },
  //     {
  //       path: "logout",
  //       action: logoutUser,
  //     },
  //   ],
  // },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={renderFunction} />
)
