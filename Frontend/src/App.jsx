import { Outlet } from "react-router-dom"
import { Header } from "./Components/Header"
import { useState } from "react"

function App() {
  const [currentUser, setCurrentUser] = useState(null)
    
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App