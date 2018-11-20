import React from 'react'

const ErrorDisplay = (errorMessage) => {
    return (
        <div className={'error'}>
            <h1>{errorMessage}</h1>
        </div>
      )
}

export default ErrorDisplay;