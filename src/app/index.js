import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import JSE from "../components/layouts/Home";
import configureStore from '../redux/store';

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <JSE />
    </Provider>,
    document.getElementById("react-root")
  );
};

render();
