import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { PlanContext } from '@/context/plan/PlanContext'
import { AuthContext } from '@/context/auth/AuthContext'
import InputForm from '@/components/plan/InputForm'
import PlanItem from '@/components/plan/PlanItem'
import ListFilter from '@/components/plan/ListFilter'
import Spinner from '@/components/layout/Spinner'

const Home = () => {
  const planContext = useContext(PlanContext)
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext)
  const { plans, getPlans, loading } = planContext
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      getPlans()
    }

    // eslint-disable-next-line
  }, [isAuthenticated])

  const loadPlans = () => {
    const completed = plans.filter((plan) => plan.complete === true)
    const incomplete = plans.filter((plan) => plan.complete === false)
    const regex = new RegExp(`${query}`, 'gi')
    if (query !== '') {
      const filteredComplete = completed.filter((plan) => {
        return plan.title.match(regex) || plan.content.match(regex)
      })
      const filteredIncomplete = incomplete.filter((plan) => {
        return plan.title.match(regex) || plan.content.match(regex)
      })
      return [...filteredIncomplete, ...filteredComplete]
    }
    return [...incomplete, ...completed]
  }

  const loadedPlans = [...loadPlans()]

  return (
    <Fragment>
      {!isAuthenticated && !authLoading ? (
        <Navigate to='/login' />
      ) : (
        <section className='bg-red-50 min-h-85v dark:bg-gray-600'>
          <div className='w-full lg:w-2/3 grid grid-flow-row lg:grid-cols-2 gap-4 py-12 mx-auto'>
            <div className='text-center'>
              <InputForm />
            </div>
            <div className='text-center'>
              <ListFilter setQuery={setQuery} />
              {!plans.length ? (
                <span className='text-xl font-semibold text-yellow-600 dark:text-white'>
                  Yay! No plans! Let's take a break!
                </span>
              ) : (
                <Fragment>
                  {plans.length && !loading ? (
                    <Fragment>
                      {loadedPlans.map((plan) => (
                        <PlanItem plan={plan} key={plan._id} />
                      ))}
                    </Fragment>
                  ) : (
                    <Spinner />
                  )}
                </Fragment>
              )}
            </div>
          </div>
        </section>
      )}
    </Fragment>
  )
}

export default Home
