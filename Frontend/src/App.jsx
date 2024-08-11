import { Outlet } from "react-router-dom"
import { Header } from "./Components/Header"
import { useState } from "react"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { myContext } from "./utils/Context"

function App() {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("user") || null)
    
  return (
    <myContext.Provider value={{currentUser, setCurrentUser}}>
    <>
      <ToastContainer />
      <Header />
      <Outlet />
    </>
    </myContext.Provider>
  )
}

export default App