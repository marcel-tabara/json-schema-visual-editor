import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import JSVE from "../components/layouts/Home";
import configureStore from "../redux/store";

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <JSVE />
    </Provider>,
    document.getElementById("react-root")
  );
};
export const getJsveStore = store.getState();
export default render();
