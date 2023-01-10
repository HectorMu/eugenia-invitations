import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const client = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    <ReactQueryDevtools />
  </QueryClientProvider>,
  document.getElementById("root")
);
