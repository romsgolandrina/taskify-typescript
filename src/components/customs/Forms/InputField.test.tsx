import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react/pure";
import "@testing-library/jest-dom";

import InputField from "./InputField";

describe("InputField", () => {
  it("renders correctly", () => {
    render(<InputField task="" setTask={() => {}} handleAddTask={() => {}} />);
    expect(screen.getByPlaceholderText("Enter a task")).toBeInTheDocument();
  });
});
