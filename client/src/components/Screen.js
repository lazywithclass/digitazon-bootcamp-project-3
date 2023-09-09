export default function Screen({ active, text = '' }) {

  const INACTIVE_BACKGROUND = 'black'
  const ACTIVE_BACKGROUND = 'white'

  return (
    <div
      className="body"
      style={{
        backgroundColor: active ?
          ACTIVE_BACKGROUND : INACTIVE_BACKGROUND
      }}>
      <span
        className="morse-current"
        style={{
          color: active ?
            INACTIVE_BACKGROUND : ACTIVE_BACKGROUND
        }}>{text}</span>
    </div>
  )
}
