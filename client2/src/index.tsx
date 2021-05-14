import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { Store } from "./store/root";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const store = new Store();

const stores = {
  rootStore: store,
  authStore: store.authStore,
  usersStore: store.usersStore,
  chatsStore: store.chatsStore,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider {...stores}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
