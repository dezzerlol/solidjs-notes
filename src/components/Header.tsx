const Header = () => {
  return (
    <div class='w-full h-12 sticky bg-slate-800 text-white flex items-center justify-center'>
      <input
        placeholder='Search...'
        class='w-1/2 p-1 rounded-md focus:outline-none text-white placeholder:text-slate-400 bg-slate-600'
      />
    </div>
  )
}

export default Header
