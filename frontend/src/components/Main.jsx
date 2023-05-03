import React from 'react'

function Main() {
  return (
    <div className='mx-10 grid md:grid-cols-6 gap-4 md:text-2xl sm:text-md font-bold text-fuchsia-400 drop-shadow-shadow'>
      <div className='col-span-5'>
        <h1 className=''>Népszerű termékek</h1>
      </div>
      <div>
        <h1 className=''>Akciós termékek</h1>
      </div>
    </div>
  )
}

export default Main