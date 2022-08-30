import { useTodos } from '../store/ContextProvider'

const Header = () => {
  const [store] = useTodos()

  return (
    <div class='w-full h-12 sticky bg-zinc-300 dark:bg-slate-800 text-white flex items-center justify-center'>
      <div class='dropdown w-1/2'>
        <input
          tabindex='0'
          placeholder='Search...'
          class='w-full p-1 rounded-md focus:outline-none text-white placeholder:text-slate-400 bg-zinc-500 dark:bg-slate-600'
        />
      </div>
    </div>
  )
}

export default Header
