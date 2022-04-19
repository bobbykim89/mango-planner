import React, { useRef } from 'react'

const ListFilter = ({ setQuery }) => {
  const text = useRef('')

  const onChange = (e) => {
    setQuery(e.target.value)
  }
  return (
    <form className='rounded-md mx-2 md:mx-0 p-4 md:p-6 bg-yellow-50 shadow-lg mb-4 dark:bg-gray-700'>
      <input
        type='text'
        ref={text}
        placeholder='Search'
        onChange={onChange}
        className='rounded outline-none block w-full px-3 py-2 shadow bg-yellow-100 dark:bg-gray-500 shadow text-yellow-600 dark:text-white'
      />
    </form>
  )
}

export default ListFilter
