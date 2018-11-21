import React from 'react'
import './Error.css'
export default function Error(props) {
  return (
    <div className="error">
      <h1>Error!</h1>
      <p className="error-mesage">{props.message}</p>
    </div>
  )
}

Error.defaultProps = {
  message: '( •́ ̯•̀  )'
}