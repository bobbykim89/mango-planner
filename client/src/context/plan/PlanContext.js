import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import {
  ADD_PLAN,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  CLEAR_PLANS,
  DELETE_PLAN,
  FILTER_PLANS,
  GET_PLANS,
  PLAN_ERROR,
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
    error: null,
  };

  const [state, dispatch] = useReducer(planReducer, initialState);

  // Get Plans
  const getPlans = async () => {
    try {
      const res = await axios.get('/api/plans');
      dispatch({ type: GET_PLANS, payload: res.data });
    } catch (err) {
      dispatch({
        type: PLAN_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Plan
  const addPlan = async (plan) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/plans', plan, config);
      dispatch({ type: ADD_PLAN, payload: res.data });
    } catch (err) {
      dispatch({
        type: PLAN_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete Plan
  const deletePlan = async (id) => {
    try {
      await axios.delete(`/api/plans/${id}`);
      dispatch({ type: DELETE_PLAN, payload: id });
    } catch (err) {
      dispatch({
        type: PLAN_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Update Plan
  const updatePlan = async (plan) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/plans/${plan._id}`, plan, config);
      dispatch({ type: UPDATE_PLAN, payload: res.data });
    } catch (err) {
      dispatch({
        type: PLAN_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Clear Plans
  const clearPlans = () => {
    dispatch({ type: CLEAR_PLANS });
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
        error: state.error,
        getPlans,
        addPlan,
        deletePlan,
        updatePlan,
        clearPlans,
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
