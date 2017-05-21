export const actions = {
  CLEAR: 'CLEAR',
};

export function clearState() {
  return {
    type: actions.CLEAR,
  };
}
