import type { Component } from 'solid-js'
import Header from './components/Header'
import Todos from './components/Todos'
import { TodosProvider, useTodos } from './store/ContextProvider'

const App: Component = () => {
  const [store] = useTodos()
  return (
    <div class={`w-screen h-screen ${store.nightMode ? 'dark' : 'light'}`}>
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
