import React, { useContext } from 'react';
import { PlanContext } from '../../context/plan/PlanContext';

const PlanItem = ({ plan }) => {
  const planContext = useContext(PlanContext);
  const { deletePlan, editPlan, setCurrent, clearCurrent } = planContext;

  const { id, title, content, complete } = plan;

  return (
    <section
      className={
        'flex flex-col rounded-md px-4 py-4 md:px-8 md:px-8 bg-yellow-50 shadow-lg mb-4' +
        (complete
          ? ' border-l-4 border-green-600'
          : ' border-l-4 border-red-600')
      }
    >
      <div className='text-yellow-600 text-lg font-semibold text-left'>
        <span>{title}</span>
      </div>
      <div className='text-yellow-600 text-md text-left'>
        <span>{content}</span>
      </div>
    </section>
  );
};

export default PlanItem;
