import React from 'react'
import * as PropTypes from 'prop-types'

import marker from 'assets/img/marker.png'
import styles from './greeting.scss'

type GreetingProps = {
  name: string
}

const Greeting = (props: GreetingProps) => {
  const { name } = props
  return (
    <p
      className={styles.greeting}
    >
      <span>
        Hello, my friend
        <b>{name}</b>
      </span>
      <img
        src={marker}
        style={{ width: '16px', height: '16px' }}
        alt="marker"
      />
    </p>
  )
}

Greeting.propTypes = {
  name: PropTypes.string,
}

Greeting.defaultProps = {
  name: '',
}

export default Greeting
