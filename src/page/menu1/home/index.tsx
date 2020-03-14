import React from 'react'

const Component = (props) => {
  return (
    <div>
      menu1 / home123123
      <button onClick={() => props.history.push('/app')} >
        to App
      </button>
    </div>
  )
}

export default Component