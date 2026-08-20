import { useEffect, useRef } from 'react'

// Cloud-shaped speech bubble that floats above a speaking portrait.
// Shows the line as it types; auto-scrolls so the newest words stay visible.
export default function SpeechBubble({ text, visible }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [text])
  if (!visible || !text) return null
  return (
    <div className="bubble fadein">
      <div className="bubble-inner" ref={ref}><p>{text}</p></div>
      <span className="bubble-tail t1" />
      <span className="bubble-tail t2" />
    </div>
  )
}
