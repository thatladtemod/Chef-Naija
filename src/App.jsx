import { useState } from 'react'

export default function App() {
  const [whatever, setWhatever] = useState(false)

  const check = whatever ? "App" : "Whatever"

  function handleClick() {
    setWhatever((prev) => !prev)
  }


  return (
    <>
      <h1>
        This is the {check} component.
      </h1>
      <button onClick={handleClick}>Click Me</button>
    </>
  )
}

