import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RouteSystem from '../src/Routes/RouteSystem'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouteSystem/>
    </>
  )
}

export default App
