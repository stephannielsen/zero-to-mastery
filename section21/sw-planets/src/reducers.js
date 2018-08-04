import { 
    REQUEST_PLANETS_PENDING,
    REQUEST_PLANETS_SUCCESS,
    REQUEST_PLANETS_FAILED
 } from './constants.js';

const initialStatePlanets = {
    isPending: false,
    planets: [],
    error: ''
  };
  
  export const requestPlanets = (state = initialStatePlanets, action = {}) => {
    switch (action.type) {
      case REQUEST_PLANETS_PENDING:
        return Object.assign({}, state, { isPending: true });
      case REQUEST_PLANETS_SUCCESS:
        return Object.assign({}, state, { planets: action.payload, isPending: false });
      case REQUEST_PLANETS_FAILED:
        return Object.assign({}, state, { error: action.payload, isPending: false });
      default:
        return state;
    }
  }