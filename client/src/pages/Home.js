import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { PlanContext } from 'context/plan/PlanContext'
import { AuthContext } from 'context/auth/AuthContext'
import InputForm from 'components/plan/InputForm'
import PlanItem from 'components/plan/PlanItem'
import ListFilter from 'components/plan/ListFilter'
import Spinner from 'components/layout/Spinner'

const Home = () => {
  const planContext = useContext(PlanContext)
  const { isAuthenticated, loading: authLoading } = useContext(AuthContext)
  const { plans, filtered, getPlans, loading } = planContext
  const [query, setQuery] = useState('')
  const [loadedPlans, setLoadedPlans] = useState([])

  useEffect(() => {
    getPlans().then(loadPlans())
    console.log('plans', plans)
    console.log(query)
    console.log(loadedPlans)
    // eslint-disable-next-line
  }, [query])

  // const filterData = (data) => {
  //   setQuery(data)
  //   console.log(query)
  // }

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
      console.log([...filteredIncomplete, ...filteredComplete])
      setLoadedPlans([...filteredIncomplete, ...filteredComplete])
      return
    }
    setLoadedPlans([...incomplete, ...completed])
  }

  const incompletePlans = plans.filter((plan) => plan.complete !== true)

  const completedPlans = plans.filter((plan) => plan.complete === true)

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
                      {/* {filtered !== null ? (
                        filtered.map((plan) => (
                          <PlanItem plan={plan} key={plan._id} />
                        ))
                      ) : (
                        <Fragment>
                          {incompletePlans.map((plan) => (
                            <PlanItem plan={plan} key={plan._id} />
                          ))}
                          {completedPlans.map((plan) => (
                            <PlanItem plan={plan} key={plan._id} />
                          ))}
                        </Fragment>
                      )} */}
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
