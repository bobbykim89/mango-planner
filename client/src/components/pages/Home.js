import React, { Fragment, useContext, useEffect } from 'react';
import { PlanContext } from '../../context/plan/PlanContext';
import { AuthContext } from '../../context/auth/AuthContext';
import InputForm from '../plan/InputForm';
import PlanItem from '../plan/PlanItem';
import ListFilter from '../plan/ListFilter';
import Spinner from '../layout/Spinner';

const Home = () => {
  const planContext = useContext(PlanContext);
  const authContext = useContext(AuthContext);
  const { plans, filtered, getPlans, loading } = planContext;

  useEffect(() => {
    authContext.loadUser();
    getPlans();
    // eslint-disable-next-line
  }, []);

  const incompletePlans = plans.filter((plan) => plan.complete !== true);

  const completedPlans = plans.filter((plan) => plan.complete === true);

  return (
    <section className='bg-red-50 min-h-85v dark:bg-gray-500'>
      <div className='w-full lg:w-2/3 grid grid-flow-row lg:grid-cols-2 gap-4 py-12 mx-auto'>
        <div className='text-center'>
          <InputForm />
        </div>
        <div className='text-center'>
          <ListFilter />
          {!plans.length ? (
            <span className='text-xl font-semibold text-yellow-600 dark:text-white'>
              Yay! No plans! Let's take a break!
            </span>
          ) : (
            <Fragment>
              {plans.length && !loading ? (
                <Fragment>
                  {filtered !== null ? (
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
                  )}
                </Fragment>
              ) : (
                <Spinner />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
