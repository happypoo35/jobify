import { render, screen } from "test/test.utils";
import Layout from "./Layout";

it("renders logout button", () => {
  render(<Layout />);
  const titleElement = screen.getByRole("button", { name: "Logout" });
  expect(titleElement).toBeInTheDocument();
});

// it("renders dashboard container", () => {
//   render(
//     <Provider store={store}>
//       <Router>
//         <Layout />
//       </Router>
//     </Provider>
//   );
//   const titleElement = screen.getByTestId("dashboard-container");
//   expect(titleElement).toBeInTheDocument();
// });

// it("should not render dogs", () => {
//   render(
//     <Provider store={store}>
//       <Router>
//         <Layout />
//       </Router>
//     </Provider>
//   );
//   const titleElement = screen.queryByText(/dogs/i);
//   expect(titleElement).not.toBeInTheDocument();
// });

// it("renders div", () => {
//   render(
//     <Provider store={store}>
//       <Router>
//         <Layout />
//       </Router>
//     </Provider>
//   );
//   const headingElements = screen.getAllByRole("button");
//   expect(headingElements.length).toBe(2);
// });
