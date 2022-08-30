import { createSignal, For } from 'solid-js'
import { IoClose, IoSunnyOutline, IoMoonOutline } from 'solid-icons/io'
import { BsCircle, BsCheckCircle } from 'solid-icons/bs'
import { useTodos } from '../store/ContextProvider'

const Todos = () => {
  const [todos, { addTodo, deleteTodo, setCompleted }] = useTodos()
  const [nightMode, setNightMode] = createSignal(true)
  const [newTodo, setNewTodo] = createSignal('')

  console.log(todos)

  const handleAdd = (e: Event) => {
    e.preventDefault()
    if (!newTodo()) return

    addTodo({ todo: { text: newTodo(), completed: false, id: Date.now() } })
    setNewTodo('')
  }

  const handleChangeDone = (id: number) => {
    setCompleted({ id })
  }

  const handleDelete = (id: number) => {
    deleteTodo({ id })
  }

  return (
    <div class='w-full h-[calc(100%-48px)] bg-slate-700 flex justify-center'>
      <main class='w-11/12 max-w-2xl drop-shadow-lg'>
        <div class='flex justify-between items-center'>
          <h3 class='text-white text-4xl my-16 font-bold tracking-widest'>TODO</h3>
          <button class='border-none text-white cursor-pointer' onClick={() => setNightMode(!nightMode())}>
            {nightMode() ? <IoSunnyOutline color='white' size={36} /> : <IoMoonOutline color='white' size={36} />}
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
          <For each={todos.todos}>
            {(todo, index) => (
              <div
                class={`w-full flex justify-between placeholder:text-white bg-slate-600 text-xl p-[18px] border-slate-500 border-b-[0.5px] 
                ${todo.completed ? 'text-slate-400' : 'text-white'}
                ${index() === 0 && 'rounded-t-md'}`}>
                <div class='flex items-center'>
                  <button class='border-none cursor-pointer' onClick={() => handleChangeDone(todo.id)}>
                    {todo.completed ? <BsCheckCircle size={24} /> : <BsCircle size={24} />}
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
          <div>{todos.todos.length} items in list</div>
        </div>
      </main>
    </div>
  )
}

export default Todos
