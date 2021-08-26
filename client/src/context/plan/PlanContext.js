import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_PLAN,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_PLAN,
  FILTER_PLANS,
  SET_CURRENT,
  UPDATE_PLAN,
} from '../types';
import planReducer from './planReducer';

export const PlanContext = createContext();

const PlanState = (props) => {
  const initialState = {
    plans: [],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(planReducer, initialState);

  // Add Plan
  const addPlan = (plan) => {
    plan.id = uuidv4();
    dispatch({ type: ADD_PLAN, payload: plan });
  };

  // Delete Plan
  const deletePlan = (id) => {
    dispatch({ type: DELETE_PLAN, payload: id });
  };

  // Update Plan
  const updatePlan = (plan) => {
    dispatch({ type: UPDATE_PLAN, payload: plan });
  };

  // Set Current Plan
  const setCurrent = (plan) => {
    dispatch({ type: SET_CURRENT, payload: plan });
  };

  // Clear Current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Plans
  const filterPlans = (text) => {
    dispatch({ type: FILTER_PLANS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <PlanContext.Provider
      value={{
        plans: state.plans,
        current: state.current,
        filtered: state.filtered,
        addPlan,
        deletePlan,
        updatePlan,
        setCurrent,
        clearCurrent,
        filterPlans,
        clearFilter,
      }}
    >
      {props.children}
    </PlanContext.Provider>
  );
};

export default PlanState;
