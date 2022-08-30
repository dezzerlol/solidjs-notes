import { createSignal, For } from 'solid-js'
import { IoClose, IoSunnyOutline, IoMoonOutline } from 'solid-icons/io'
import { BsCircle, BsCheckCircle } from 'solid-icons/bs'
import { Todo, useTodos } from '../store/ContextProvider'

type Tabs = 'All' | 'Active' | 'Completed'

const tabs: Tabs[] = ['All', 'Active', 'Completed']

const Todos = () => {
  const [store, { addTodo, deleteTodo, setCompleted, removeCompleted, setNightMode }] = useTodos()
  const [activeTab, setActiveTab] = createSignal<Tabs>('All')
  const [newTodo, setNewTodo] = createSignal('')

  function filteredItems(): Todo[] | null {
    if (activeTab() === 'All') {
      return store.todos
    }

    if (activeTab() === 'Active') {
      return store.todos.filter((todo) => !todo.completed)
    }

    if (activeTab() === 'Completed') {
      return store.todos.filter((todo) => todo.completed)
    }

    return null
  }

  const handleAdd = (e: Event) => {
    e.preventDefault()
    if (!newTodo()) return
    const todo = { text: newTodo(), completed: false, id: Date.now() }

    addTodo({ todo })
    setNewTodo('')
  }

  return (
    <div class='w-full h-full bg-zinc-200  dark:bg-slate-700 flex justify-center'>
      <main class='w-11/12 max-w-2xl drop-shadow-lg'>
        <div class='flex justify-between items-center -z-10'>
          <h3 class='text-zinc-800 dark:text-white text-4xl my-16 font-bold tracking-widest'>TODO</h3>
          <label class='swap swap-rotate border-none  cursor-pointer'>
            <input type='checkbox' class='swap-input' onChange={() => setNightMode()} />
            <IoSunnyOutline class='swap-on text-zinc-800 dark:text-white' size={36} />
            <IoMoonOutline class='swap-off text-zinc-800 dark:text-white' size={36} />
          </label>
        </div>
        <form onSubmit={handleAdd}>
          <input
            placeholder='Create a new todo...'
            value={newTodo()}
            onChange={(e) => setNewTodo(e.currentTarget.value)}
            class='w-full h-16 p-4 rounded-md focus:outline-none text-white placeholder:text-slate-400 bg-zinc-500 dark:bg-slate-600'
          />
        </form>

        <div class='max-h-[325px] overflow-y-auto mt-6'>
          <For each={filteredItems()}>
            {(todo, index) => (
              <div
                class={`w-full flex justify-between placeholder:text-white bg-zinc-500 dark:bg-slate-600 text-xl p-[18px] border-slate-300 dark:border-slate-500 border-b-[0.5px] 
                ${todo.completed ? 'text-slate-400' : 'text-white'}
                ${index() === 0 && 'rounded-t-md'}`}>
                <div class='flex items-center'>
                  <button class='border-none cursor-pointer' onClick={() => setCompleted({ id: todo.id })}>
                    {todo.completed ? <BsCheckCircle size={24} /> : <BsCircle size={24} />}
                  </button>
                  <div class='ml-3 text-xl'>{todo.text}</div>
                </div>
                <button class='border-none  cursor-pointer'>
                  <IoClose size={24} onClick={() => deleteTodo({ id: todo.id })} />
                </button>
              </div>
            )}
          </For>
        </div>

        {store.todos.length > 0 && (
          <div class='w-full flex justify-between bg-zinc-500 dark:bg-slate-600 border-t-[0.5px] border-slate-300 dark:border-slate-500 p-4 rounded-b-md text-slate-200 dark:text-slate-400'>
            <div class='w-1/5'>{filteredItems()?.length} items in list</div>
            <div class='flex justify-center w-3/5'>
              <For each={tabs}>
                {(tab) => (
                  <div
                    onClick={() => setActiveTab(tab)}
                    class={`mr-2 cursor-pointer ${tab === activeTab() && 'text-zinc-800 dark:text-blue-400'}`}>
                    {tab}
                  </div>
                )}
              </For>
            </div>
            <div class='flex justify-end w-1/5 cursor-pointer' onClick={removeCompleted}>
              Clear completed
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Todos
