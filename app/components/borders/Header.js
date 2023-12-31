import React, { useContext } from "react"
import { Link } from "react-router-dom"
import HeaderGuestLoggedOut from "./HeaderGuestLoggedOut"
import HeaderUserLoggedIn from "./HeaderUserLoggedIn"
import StateContext from "../../StateContext"

function Header(props) {
  const appState = useContext(StateContext)

  return (
    <header className='header-bar bg-primary mb-3'>
      <div className='container d-flex flex-column flex-md-row align-items-center p-3'>
        <h4 className='my-0 mr-md-auto font-weight-normal'>
          <Link to='/' className='text-white'>
            {" "}
            App{" "}
          </Link>
        </h4>
        {appState.loggedIn ? <HeaderUserLoggedIn /> : <HeaderGuestLoggedOut />}
      </div>
    </header>
  )
}

export default Header
