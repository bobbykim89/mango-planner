import React, { useContext, useEffect } from 'react';
import InputForm from '../plan/InputForm';
import { PlanContext } from '../../context/plan/PlanContext';
import { AuthContext } from '../../context/auth/AuthContext';
import PlanItem from '../plan/PlanItem';
import ListFilter from '../plan/ListFilter';

const Home = () => {
  const planContext = useContext(PlanContext);
  const authContext = useContext(AuthContext);
  const { plans, filtered } = planContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <section className='bg-red-50 min-h-85v dark:bg-gray-400'>
      <div className='w-full lg:w-2/3 grid grid-flow-row lg:grid-cols-2 gap-4 py-12 mx-auto'>
        <div className='text-center'>
          <InputForm />
        </div>
        <div className='text-center'>
          <ListFilter />
          {filtered !== null
            ? filtered.map((plan) => <PlanItem plan={plan} key={plan.id} />)
            : plans.map((plan) => <PlanItem plan={plan} key={plan.id} />)}
        </div>
      </div>
    </section>
  );
};

export default Home;
