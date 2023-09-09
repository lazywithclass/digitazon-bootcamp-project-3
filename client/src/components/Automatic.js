import { useState, useEffect } from 'react'
import { fromNaturalLanguage } from '../Morse'

export default function Automatic() {

  const INACTIVE_BACKGROUND = 'black'
  const ACTIVE_BACKGROUND = 'white'
  const DOT_IMPULSE_LENGTH = 500
  const LINE_IMPULSE_LENGTH = 1000
  const END_OF_SENTENCE_WAIT = 10000

  const [background, setBackground] = useState(INACTIVE_BACKGROUND)

  const [morse, setMorse] = useState()
  const [current, setCurrent] = useState()

  async function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  useEffect(() => {
    async function get() {
      const res = await fetch('http://localhost:3001/sentences')
      const sentences = await res.json()
      setMorse(fromNaturalLanguage(sentences[0]))
    }

    get()
  }, [])

  useEffect(() => {
    async function fromMorseToImpulses(morse, i) {
      if (i === morse.length) {
        return
      }

      async function sendCurrentImpulse(impulse, j) {
        if (j === impulse.length) {
          return
        }

        setCurrent(morse[i])

        setBackground(ACTIVE_BACKGROUND)
        await sleep(
          impulse[j] === '.' ? DOT_IMPULSE_LENGTH : LINE_IMPULSE_LENGTH)
        setBackground(INACTIVE_BACKGROUND)
        await sleep(
          impulse[j] === '.' ? DOT_IMPULSE_LENGTH : LINE_IMPULSE_LENGTH)

        await sendCurrentImpulse(impulse, j + 1)
      }
      await sendCurrentImpulse(morse[i], 0)

      await fromMorseToImpulses(morse, i + 1)
    }

    async function run() {
      if (morse) {
        await fromMorseToImpulses(morse, 0)
        await sleep('', END_OF_SENTENCE_WAIT)
      }
    }

    run()

  }, [morse])

  let textColor = background === INACTIVE_BACKGROUND ?
      ACTIVE_BACKGROUND : INACTIVE_BACKGROUND

  return (
    <div className="body" style={{ backgroundColor: background }}>
      <span
    className="morse-current"
        style={{color: textColor}}>{current}</span>
    </div>
  )
}
