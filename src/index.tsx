/* @refresh reload */
import { render } from 'solid-js/web'
import './styles/index.css'
import App from './App'
import { TodosProvider } from './store/ContextProvider'

render(
  () => (
    <TodosProvider>
      <App />
    </TodosProvider>
  ),
  document.getElementById('root') as HTMLElement
)
