import axios from "axios";
export const myaction = (name) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/tickers?symbols=ALL`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        cors: "no-cors",
      },
    })
      .then((res) => {
        console.log(res.data, "repodata");
        dispatch({ type: "CHANGING", payload: res.data });
      })

      .catch((err) => {
        console.log(err);
      });
  };
};
