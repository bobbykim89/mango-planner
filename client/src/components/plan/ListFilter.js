import React, { useContext, useEffect, useRef } from 'react'
import { PlanContext } from 'context/plan/PlanContext'

const ListFilter = ({ setQuery }) => {
  const planContext = useContext(PlanContext)
  const text = useRef('')

  const { filterPlans, clearFilter, filtered } = planContext

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = (e) => {
    filterPlans(e.target.value)
    setQuery(e.target.value)
    // if (text.current.value !== '') {

    // } else {
    //   clearFilter()
    // }
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
