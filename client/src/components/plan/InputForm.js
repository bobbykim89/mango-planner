import React, { useContext, useState } from 'react'
import { PlanContext } from 'context/plan/PlanContext'
import { AuthContext } from 'context/auth/AuthContext'
import { AlertContext } from 'context/alert/AlertContext'

const InputForm = () => {
  const planContext = useContext(PlanContext)
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)

  const { addPlan } = planContext
  const { user } = authContext
  const { setAlert } = alertContext

  const [plan, setPlan] = useState({
    title: '',
    content: '',
    complete: false,
    type: 'personal',
  })

  const { title, content, type } = plan

  const onChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      setAlert('Please login!')
    } else {
      addPlan(plan)
      setPlan({
        title: '',
        content: '',
        complete: false,
        type: 'personal',
      })
    }
  }
  return (
    <section className='lg:sticky lg:top-24'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col rounded-md mx-2 md:mx-0 px-4 py-4 md:px-8 md:px-8 bg-yellow-50 shadow-lg dark:bg-gray-700'
      >
        <div className='mb-4 text-left'>
          <label
            htmlFor='title'
            className='text-yellow-600 text-lg font-semibold dark:text-white'
          >
            Title:
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={onChange}
            required
            placeholder='Please write your plan here'
            className='outline-none block w-full p-2 border-2 shadow border-yellow-400 bg-transparent dark:border-gray-300 text-yellow-600 dark:text-white'
          />
        </div>
        <div className='mb-4 text-left'>
          <label
            htmlFor='content'
            className='text-yellow-600 text-lg font-semibold dark:text-white'
          >
            Details:
          </label>
          <textarea
            name='content'
            id='content'
            placeholder='Write details here'
            value={content}
            onChange={onChange}
            className='outline-none block w-full border-2 p-2 shadow border-yellow-400 bg-transparent text-yellow-600 dark:border-gray-300 dark:text-white h-32 lg:h-64 scrollbar-thin dark:scrollbar-thumb-gray-500 dark:scrollbar-track-gray-400 overflow-y-scroll scrollbar-thumb-yellow-300 scrollbar-track-yellow-200'
          ></textarea>
        </div>
        <div className='mb-4 text-lg font-semibold'>
          <label
            htmlFor='personal'
            className='text-yellow-600 dark:text-gray-200'
          >
            Personal{' '}
          </label>
          <input
            type='radio'
            id='personal'
            name='type'
            value='personal'
            checked={type === 'personal'}
            onChange={onChange}
            className='mr-6'
          />
          <label htmlFor='work' className='text-green-600 dark:text-green-200'>
            Work{' '}
          </label>
          <input
            type='radio'
            id='work'
            name='type'
            value='work'
            checked={type === 'work'}
            onChange={onChange}
            className='mr-6'
          />
          <label
            htmlFor='errand'
            className='text-indigo-600 dark:text-indigo-300'
          >
            Errand{' '}
          </label>
          <input
            type='radio'
            id='errand'
            name='type'
            value='errand'
            checked={type === 'errand'}
            onChange={onChange}
            className='mr-6'
          />
        </div>
        <div>
          <input
            type='submit'
            value='Submit'
            className='block w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-lg text-white font-semibold tracking-wider shadow-lg cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-500'
          />
        </div>
      </form>
    </section>
  )
}

export default InputForm
