import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "app/store";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
