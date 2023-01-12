import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const container = document.getElementById("app");
const root = createRoot(container);

const client = new QueryClient();

root.render(
  <QueryClientProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
