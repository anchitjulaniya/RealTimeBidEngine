import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './Pages/Home.jsx';
import { Signin } from './Components/Signin.jsx';
import { Signup } from './Components/Signup.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import BidCreation from './Pages/BidCreation.jsx';
import BidPage from './Pages/BidPage.jsx';


const renderFunction = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path: "/",
        element: <Dashboard />
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
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/create-bid", 
        element: <BidCreation />
      },
      {
        path: "/bid/:id",
        element: <BidPage />
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
