import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SingleTask from "./SingleTask";
import { Task } from "../../../types/Task";

describe("SingleTask", () => {
  it("renders correctly", () => {
    const mockTask: Task = {
      id: 1,
      task: "Test task",
      isDone: false,
    };

    render(<SingleTask task={mockTask} tasks={[]} setTasks={() => {}} />);
    expect(screen.getByText("Test task")).toBeInTheDocument();
  });
});
