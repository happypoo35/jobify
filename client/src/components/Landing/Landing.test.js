import { render, screen } from "test/test.utils";
import Landing from ".";

it("renders page title", () => {
  render(<Landing />);
  const titleElement = screen.getByText(/tracking/i);
  expect(titleElement).toBeInTheDocument();
});

it("renders page header", () => {
  render(<Landing />);
  const titleElement = screen.getByRole("heading");
  expect(titleElement).toBeInTheDocument();
});
