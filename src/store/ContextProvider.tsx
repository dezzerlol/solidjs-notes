import { createContext, ParentComponent, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'

export type Todo = {
  id: number
  text: string
  completed: boolean
}

export type TodoContextState = {
  todos: Todo[]
}

export type TodoContextValue = [
  state: TodoContextState,
  actions: {
    addTodo: ({ todo }: { todo: Todo }) => void
    deleteTodo: ({ id }: { id: number }) => void
    setCompleted: ({ id }: { id: number }) => void
  }
]

const defaultState = {
  todos: [
    { id: 1, text: 'Learn Solid-js', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
  ],
}

const TodoContext = createContext<TodoContextValue>([
  defaultState,
  {
    addTodo: () => undefined,
    deleteTodo: () => undefined,
    setCompleted: () => undefined,
  },
])

export const TodosProvider: ParentComponent<{ todos: Todo[] }> = (props) => {
  const [state, setState] = createStore({ todos: props.todos || [] })

  const addTodo = ({ todo }: { todo: Todo }) => {
    console.log(todo)
    setState('todos', (todos) => [todo, ...todos])
  }

  const deleteTodo = ({ id }: { id: number }) => {
    setState('todos', (todos) => todos.filter((todo) => todo.id !== id))
  }

  const setCompleted = ({ id }: { id: number }) => {
    setState('todos', (todos) => todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  return (
    <TodoContext.Provider value={[state, { addTodo, deleteTodo, setCompleted }]}>{props.children}</TodoContext.Provider>
  )
}

export const useTodos = () => useContext(TodoContext)
