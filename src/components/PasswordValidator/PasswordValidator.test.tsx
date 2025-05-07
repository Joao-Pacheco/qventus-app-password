import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordValidator } from "./PasswordValidator";
import "@testing-library/jest-dom";

test("shows all validation messages correctly", () => {
  render(<PasswordValidator options={["specialChar", "digit", "uppercase"]} />);
  fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
    target: { value: "Test123!" },
  });

  expect(screen.getByText(/special character/i)).toHaveClass("valid");
  expect(screen.getByText(/number/i)).toHaveClass("valid");
  expect(screen.getByText(/uppercase/i)).toHaveClass("valid");
});
