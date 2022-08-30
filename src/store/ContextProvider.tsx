import { createContext, ParentComponent, useContext } from 'solid-js'
import { createStore, produce } from 'solid-js/store'

export type Todo = {
  id: number
  text: string
  completed: boolean
}

export type TodoContextState = {
  todos: Todo[]
  nightMode: boolean
}

export type TodoContextValue = [
  store: TodoContextState,
  actions: {
    addTodo: ({ todo }: { todo: Todo }) => void
    deleteTodo: ({ id }: { id: number }) => void
    setCompleted: ({ id }: { id: number }) => void
    removeCompleted: () => void
    setNightMode: () => void
  }
]

const defaultState = {
  todos: [
    { id: 1, text: 'Learn Solid-js', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Learn React', completed: true },
    { id: 4, text: 'npm yarn pnpm', completed: true },
  ],
  nightMode: true,
}

const TodoContext = createContext<TodoContextValue>([
  defaultState,
  {
    addTodo: () => undefined,
    deleteTodo: () => undefined,
    setCompleted: () => undefined,
    removeCompleted: () => undefined,
    setNightMode: () => undefined,
  },
])

export const TodosProvider: ParentComponent<{ todos?: Todo[]; nightMode?: boolean }> = (props) => {
  const [store, setStore] = createStore({
    todos: props.todos || defaultState.todos,
    nightMode: props.nightMode || defaultState.nightMode,
  })

  const value: TodoContextValue = [
    store,
    {
      addTodo({ todo }) {
        setStore(
          'todos',
          produce((todos) => todos.unshift(todo))
        )
      },

      deleteTodo({ id }) {
        setStore('todos', (todos) => todos.filter((todo) => todo.id !== id))
      },

      setCompleted({ id }) {
        setStore(
          'todos',
          (todo) => todo.id === id,
          produce((todo) => (todo.completed = !todo.completed))
        )
      },

      setNightMode() {
        setStore('nightMode', (nightMode) => !nightMode)
      },

      removeCompleted() {
        // get ids where completed is true
        const ids = store.todos.filter((todo) => todo.completed).map((todo) => todo.id)

        // remove todos with those ids
        setStore('todos', (todos) => todos.filter((todo) => !ids.includes(todo.id)))
      },
    },
  ]

  return <TodoContext.Provider value={value}>{props.children}</TodoContext.Provider>
}

export const useTodos = () => useContext(TodoContext)
