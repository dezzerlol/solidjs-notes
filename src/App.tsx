import type { Component } from 'solid-js'
import Header from './components/Header'
import Todos from './components/Todos'

const App: Component = () => {
  return (
    <div class='w-screen h-screen'>
      <Header />
      <Todos />
    </div>
  )
}

export default App

// TODO:
// folders
// search
// mode switch
// save in local storage
// filter all/active/completed