import React, { useState } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  return (
    <div className="counter">
      <p className="counter__text">
        You click
        {' '}
        <b className="counter__number">{count}</b>
        {' '}
        times
      </p>
      <button
        type="button"
        className="counter__button"
        onClick={() => setCount(count + 1)}
      >
        Click Me!
      </button>
    </div>
  )
}
