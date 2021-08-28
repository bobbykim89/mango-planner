import React, { useContext, useState } from 'react';
import InputForm from '../plan/InputForm';
import { PlanContext } from '../../context/plan/PlanContext';
import PlanItem from '../plan/PlanItem';

const Home = () => {
  const planContext = useContext(PlanContext);
  const { plans, current, filtered } = planContext;

  return (
    <section className='bg-red-50 min-h-85v'>
      <div className='w-full lg:w-2/3 grid grid-flow-row lg:grid-cols-2 gap-4 py-12 mx-auto'>
        <div className='text-center'>
          <InputForm />
        </div>
        <div className='text-center'>
          {plans && plans.map((plan) => <PlanItem plan={plan} key={plan.id} />)}
        </div>
      </div>
    </section>
  );
};

export default Home;
