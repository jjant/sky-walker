import api from '../lib/api';

export const actions = {
  SUBMIT_PASSENGERS: 'SUBMIT_PASSENGERS',
  SUBMIT_PAYMENT: 'SUBMIT_PAYMENT',
  NEW_PASSENGERS: 'NEW_PASSENGERS',
  SET_FLIGHT: 'SET_FLIGHT',
  CLEAR_PASSENGERS: 'CLEAR_PASSENGERS',
  CLEAR_PAYMENT: 'CLEAR_PAYMENT',
};

export function submitPassengers(passengers) {
  return {
    type: actions.SUBMIT_PASSENGERS,
    payload: passengers,
  };
}

export function setFlightBooking(id) {
  return {
    type: actions.SET_FLIGHT,
    payload: id,
  };
}

export function clearPassengers() {
  return {
    type: actions.CLEAR_PASSENGERS,
  };
}

export function clearPayment() {
  return {
    type: actions.CLEAR_PAYMENT,
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