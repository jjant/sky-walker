import api from '../lib/api';

export const actions = {
  SUBMIT_PASSENGERS: 'SUBMIT_PASSENGERS',
  SUBMIT_PAYMENT: 'SUBMIT_PAYMENT',
  NEW_PASSENGERS: 'NEW_PASSENGERS',
  SET_FLIGHT: 'SET_FLIGHT',
};

export function submitPassengers(passengers) {
  return {
    type: actions.SUBMIT_PASSENGERS,
    payload: passengers,
  };
}

export function setFlightBooking(id) {
  console.log('ID', id)
  return {
    type: actions.SET_FLIGHT,
    payload: id,
  };
}

export function submitPayment(paymentInfo) {
  return {
    type: actions.SUBMIT_PAYMENT,
    payload: paymentInfo,
  };
}

export function newPassengers(amount) {
  return {
    type: actions.NEW_PASSENGERS,
    payload: amount,
  };
}