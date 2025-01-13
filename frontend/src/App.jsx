import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/components/ui/button'
import Page1 from './components/Page1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Page1/>
    </>
  )
}

export default App
