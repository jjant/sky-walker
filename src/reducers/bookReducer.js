import { actions } from '../actions/bookActions';

function bookReducer(state = initialBookState, action) {
  switch (action.type) {
    case actions.SUBMIT_PASSENGERS:
      return { ...state, passengers: action.payload };
    case actions.CLEAR_PASSENGERS:
      return { ...state, passengers: [] };
    case actions.SUBMIT_PAYMENT:
      return { ...state, payment: action.payload };
    case actions.CLEAR_PAYMENT:
      return { ...state, payment: {} };
    case actions.SET_FLIGHT:
      return { ...state, flightId: action.payload };
    case actions.NEW_PASSENGERS:
      const arr = []
      for (let i = 0; i < action.payload; i++) arr.push({ id_type: '1' }); 
      return { ...state, passengers: arr };
    default:
      return state;
  }
}

const initialBookState = {
  payment: {},
  passengers: [],
};

export default bookReducer;
