import {
  ADD_PLAN,
  CLEAR_CURRENT,
  CLEAR_PLANS,
  DELETE_PLAN,
  GET_PLANS,
  PLAN_ERROR,
  SET_CURRENT,
  UPDATE_PLAN,
} from '../types'

const planReducer = (state, action) => {
  switch (action.type) {
    case GET_PLANS:
      return {
        ...state,
        plans: action.payload,
        loading: false,
      }
    case ADD_PLAN:
      return {
        ...state,
        plans: [action.payload, ...state.plans],
        loading: false,
      }
    case UPDATE_PLAN:
      return {
        ...state,
        plans: state.plans.map((plan) =>
          plan._id === action.payload._id ? action.payload : plan
        ),
        loading: false,
      }
    case DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter((plan) => plan._id !== action.payload),
        loading: false,
      }
    case CLEAR_PLANS:
      return {
        ...state,
        plans: [],
        filtered: null,
        error: null,
        current: null,
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      }
    case PLAN_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export default planReducer
