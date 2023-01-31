import React from 'react'
import spinner from './Spinner.gif'
const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={spinner} className="my-3" alt="loading" />
    </div>
  )
}

export default Spinner
