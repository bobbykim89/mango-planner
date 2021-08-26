import {
  ADD_PLAN,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  DELETE_PLAN,
  FILTER_PLANS,
  SET_CURRENT,
  UPDATE_PLAN,
} from '../types';

const planReducer = (state, action) => {
  switch (action.type) {
    case ADD_PLAN:
      return {
        ...state,
        plans: [...state.plans, action.payload],
      };
    case UPDATE_PLAN:
      return {
        ...state,
        plans: state.plans.map((plan) =>
          plan.id === action.payload.id ? action.payload : plan
        ),
      };
    case DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter((plan) => plan.id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_PLANS:
      return {
        ...state,
        filtered: state.plans.filter((plan) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return plan.title.match(regex) || plan.content.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
};

export default planReducer;
