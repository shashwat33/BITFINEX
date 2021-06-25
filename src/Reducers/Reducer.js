const iState = {
  data: [],
  loading: false,
};
const reducer = (state = iState, action) => {
  if (action.type === "CHANGING") {
    return { data: action.payload, loading: false };
  }
  if (action.type === "LOADING") {
    return { loading: true };
  }
  return state;
};
export default reducer;
