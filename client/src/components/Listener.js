import { useState, useEffect } from 'react'
import Screen from './Screen'

export default function Listener() {

  const [active, setActive] = useState()

  useEffect(() => {
    function handleKeyUp(event) {
      if (event.key === " ") {
        setActive(false)
      }
    }
    function handleKeyDown(event) {
      if (event.key === " ") {
        setActive(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [])

  return (
    <div className="App-header">
      <Screen active={active} />
    </div>
  )
}
