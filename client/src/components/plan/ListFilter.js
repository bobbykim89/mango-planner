import React, { useContext, useEffect, useRef } from 'react';
import { PlanContext } from '../../context/plan/PlanContext';

const ListFilter = () => {
  const planContext = useContext(PlanContext);
  const text = useRef('');

  const { filterPlans, clearFilter, filtered } = planContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPlans(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input type='text' ref={text} placeholder='Search' onChange={onChange} />
    </form>
  );
};

export default ListFilter;
