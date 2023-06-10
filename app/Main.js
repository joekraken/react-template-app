import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// custom react components
import Header from "./components/borders/Header"
import Footer from "./components/borders/Footer"
import Home from "./components/Home"
import HomeGuest from "./components/HomeGuest"
import About from "./components/utility/About"
import Terms from "./components/utility/Terms"

import FlashMessages from "./components/FlashMessages"
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"

function MainComponent() {
  const initialState = {
    isLoggedIn: Boolean(false),
    user: {
      name: "user name",
      avatar: "user avatar from gravatar",
      token: "user token for security"
    }
  }
  // replace reducer with immer passes a draft copy of the state
  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.user = action.userData
        break
      case "logout":
        draft.loggedIn = false
        break
      case "flashMessage":
        draft.flashMessages.push(action.value)
      default:
        break
    }
  }
  const [state, dispatch] = useReducer(ourReducer, initialState)

  // listen to changes to user isLoggedIn status
  useEffect(() => {
    if (state.isLoggedIn) {
      localStorage.setItem("userToken", state.user.token)
      localStorage.setItem("username", state.user.name)
      localStorage.setItem("userAvatar", state.user.avatar)
    } else {
      localStorage.removeItem("userToken")
      localStorage.removeItem("username")
      localStorage.removeItem("userAvatar")
    }
  }, [state.isLoggedIn])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path='/' element={state.isLoggedIn ? <Home /> : <HomeGuest />} />
            <Route path='/about-us' element={<About />} />
            <Route path='/terms' element={<Terms />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

ReactDOM.createRoot(document.querySelector("#app")).render(<MainComponent />)

if (module.hot) {
  module.hot.accept
}
