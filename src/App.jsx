import React from 'react'
import Weather from './components/weather';
import ThemeToggle from './components/Atoms/ThemeToggle/ThemeToggle';
const App = () => {
  return (
    <div className='app'>
      <ThemeToggle/>
      <Weather/>
    </div>
  )
}

export default App