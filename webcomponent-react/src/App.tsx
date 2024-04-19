import { useState } from 'react'
import Frontend from './Frontend'


export default function App() {
  const [count, setCount] = useState(0)

  return (
    <Frontend count={count} setCount={setCount} />
  )
}

