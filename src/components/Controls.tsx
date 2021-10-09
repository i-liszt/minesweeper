import React from 'react'
import ControlsStyle from 'scss/components/controls.scss'

export default () => (
  <div className={ControlsStyle.controls}>
    <div>Time</div>
    <div className={ControlsStyle.controls__mines}>Input Mine</div>
  </div>
)
