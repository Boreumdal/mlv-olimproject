import Main from './components/Main'
import { useState } from 'react'

function App() {
  const [bright, setBright] = useState(true)

  const changeBright = () => {
    setBright(!bright)
  }

  return (
    <div className={(bright ? 'bg-gray-100' : 'dark-mode') + " w-full h-screen flex justify-center items-center duration-300"}>
      <Main bright={bright} changer={changeBright} />
    </div>
  )
}

export default App
