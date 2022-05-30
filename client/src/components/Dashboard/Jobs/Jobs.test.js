import { render, screen, fireEvent } from "test/test.utils";
import JobCard from "./JobCard";
import Filters from "./Filters";
import Jobs from "./Jobs";

describe("Jobs", () => {
  it("should load jobs list", async () => {
    render(<Jobs />);
    screen.getByText(/no jobs to display/i);

    const jobs = await screen.findAllByRole("article");

    screen.getByText(/1 job found/i);

    expect(jobs.length).toBe(1);
    expect(screen.getByText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/may 24, 2022/i)).toBeInTheDocument();
  });
});

describe("Job card", () => {
  const job = {
    company: "test company",
    position: "test position",
    jobLocation: "test location",
    jobType: "full-time",
    status: "pending",
    createdAt: "2021-06-04",
  };

  it("should show job card menu", () => {
    render(<JobCard job={job} />);

    const toggleMenuBtn = screen.getByRole("button", { name: "toggle-menu" });
    const menuElement = screen.getByRole("menu");

    expect(menuElement).not.toHaveClass("active");

    fireEvent.click(toggleMenuBtn);

    expect(menuElement).toHaveClass("active");
  });
});

describe("Filters", () => {
  it("should be able to type in input", () => {
    render(<Filters jobsCount="10" pageCount="1" />);

    const searchInput = screen.getByLabelText(/search/i);
    const clearBtn = screen.getByRole("button", { name: /clear filters/i });

    expect(searchInput.value).toBe("");

    fireEvent.change(searchInput, { target: { value: "Test" } });

    expect(searchInput.value).toBe("Test");

    fireEvent.click(clearBtn);

    expect(searchInput.value).toBe("");
  });
});
