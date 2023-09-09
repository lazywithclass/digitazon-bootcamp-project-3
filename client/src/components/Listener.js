import { useState, useEffect } from 'react'

export default function Listener() {

  const DEFAULT_BACKGROUD = 'black'
  const [background, setBackground] = useState(DEFAULT_BACKGROUD)

  function turnWhite() {
    setBackground('white')
  }

  function resetBackground() {
    setBackground(DEFAULT_BACKGROUD)
  }

  useEffect(() => {
    function handleKeyUp(event) {
      if (event.key === " ") {
        resetBackground()
      }
    }
    function handleKeyDown(event) {
      if (event.key === " ") {
        turnWhite()
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
    <div className="App-header" style={{backgroundColor: background}}></div>
  )
}
