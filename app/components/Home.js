import React, { useContext, useEffect } from "react"
import Page from "./Page"
import StateContext from "../StateContext"

function Home() {
  const appState = useContext(StateContext)

  return (
    <Page title='home page'>
      <h2 className='text-center'>
        Hello <strong>{appState.user.name}</strong>
      </h2>
      <p className='lead text-muted text-center'>Your feed goes here!</p>
    </Page>
  )
}

export default Home
