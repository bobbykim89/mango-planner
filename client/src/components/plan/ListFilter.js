import React, { useContext, useEffect, useRef } from 'react'
import { PlanContext } from 'context/plan/PlanContext'

const ListFilter = () => {
  const planContext = useContext(PlanContext)
  const text = useRef('')

  const { filterPlans, clearFilter, filtered } = planContext

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPlans(e.target.value)
    } else {
      clearFilter()
    }
  }
  return (
    <form className='rounded-md mx-2 md:mx-0 px-4 py-4 bg-yellow-50 shadow-lg mb-4 dark:bg-gray-700'>
      <input
        type='text'
        ref={text}
        placeholder='Search'
        onChange={onChange}
        className='outline-none block w-full p-2 border-2 bg-transparent border-2 shadow border-yellow-400 dark:border-gray-300 dark:focus:text-white'
      />
    </form>
  )
}

export default ListFilter
