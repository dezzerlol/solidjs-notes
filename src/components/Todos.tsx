import { createSignal, For } from 'solid-js'
import { IoClose, IoSunnyOutline, IoMoonOutline } from 'solid-icons/io'
import { BsCircle, BsCheckCircle} from 'solid-icons/bs'

type Todo = {
  text: string
  done: boolean
  id: number
}

const Todos = () => {
  const [nightMode, setNightMode] = createSignal(true)
  const [newTodo, setNewTodo] = createSignal('')
  const [todoList, setTodoList] = createSignal<Todo[]>([
    { id: 1, text: 'Learn Solid', done: false },
    { id: 2, text: 'Learn React', done: true },
    { id: 3, text: 'Learn Vue', done: false },
    { id: 4, text: 'Learn Angular', done: false },
    { id: 5, text: 'Learn Svelte', done: false },
  ])

  const handleAdd = (e: Event) => {
    e.preventDefault()
    if (!newTodo()) return

    setTodoList((todos) => [{ done: false, id: todos.length + 1, text: newTodo() }, ...todos])
    setNewTodo('')
  }

  const handleChangeDone = (id: number) => {
    setTodoList((todos) => todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }

  const handleDelete = (id: number) => {
    setTodoList((todos) => todos.filter((todo) => todo.id !== id))
  }

  return (
    <div class='w-full h-[calc(100%-48px)] bg-slate-700 flex justify-center'>
      <main class='w-11/12 max-w-2xl drop-shadow-lg'>
        <div class='flex justify-between items-center'>
          <h3 class='text-white text-4xl my-16 font-bold tracking-widest'>TODO</h3>
          <button class='border-none text-white cursor-pointer' onClick={() => setNightMode(!nightMode())}>
            {nightMode() ? <IoSunnyOutline color='white' size={36} /> : <IoMoonOutline color='white' size={36}/>}
          </button>
        </div>
        <form onSubmit={handleAdd}>
          <input
            placeholder='Create a new todo...'
            value={newTodo()}
            onChange={(e) => setNewTodo(e.currentTarget.value)}
            class='w-full h-16 p-4 rounded-md focus:outline-none text-white placeholder:text-slate-400 bg-slate-600'
          />
        </form>

        <div class='max-h-[325px] overflow-y-auto mt-6'>
          <For each={todoList()}>
            {(todo, index) => (
              <div
                class={`w-full flex justify-between placeholder:text-white bg-slate-600 text-xl p-[18px] border-slate-500 border-b-[0.5px] 
                ${todo.done ? 'text-slate-400' : 'text-white'}
                ${index() === 0 && 'rounded-t-md'}`}>
                <div class='flex items-center'>
                  <button class='border-none cursor-pointer' onClick={() => handleChangeDone(todo.id)}>
                    {todo.done ? <BsCheckCircle size={24} /> : <BsCircle size={24} />}
                  </button>
                  <div class='ml-3 text-xl'>{todo.text}</div>
                </div>
                <button class='border-none  cursor-pointer'>
                  <IoClose size={24} onClick={() => handleDelete(todo.id)} />
                </button>
              </div>
            )}
          </For>
        </div>

        <div class='w-full flex justify-between bg-slate-600 border-t-[0.5px] border-slate-500 p-4 rounded-b-md text-slate-400'>
          <div>{todoList().length} items in list</div>
        </div>
      </main>
    </div>
  )
}

export default Todos
