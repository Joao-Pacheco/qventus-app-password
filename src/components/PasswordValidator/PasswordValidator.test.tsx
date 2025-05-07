import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordValidator, RequirementType } from "./PasswordValidator";

describe("PasswordValidator Component", () => {
  const defaultOptions: RequirementType[] = [
    "specialChar",
    "digit",
    "uppercase",
  ];

  it("renders the component correctly", () => {
    render(<PasswordValidator options={defaultOptions} />);
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("shows default validation messages", () => {
    render(<PasswordValidator options={defaultOptions} />);
    expect(
      screen.getByText("Contains special character (!@#$%^&*)")
    ).toBeInTheDocument();
    expect(screen.getByText("Contains a number")).toBeInTheDocument();
    expect(
      screen.getByText("Contains an uppercase letter")
    ).toBeInTheDocument();
  });

  it("validates password based on default rules", () => {
    render(<PasswordValidator options={defaultOptions} />);
    const input = screen.getByLabelText("Password");

    fireEvent.change(input, { target: { value: "Password1!" } });

    expect(
      screen.getByText("Contains special character (!@#$%^&*)")
    ).toHaveClass("valid");
    expect(screen.getByText("Contains a number")).toHaveClass("valid");
    expect(screen.getByText("Contains an uppercase letter")).toHaveClass(
      "valid"
    );
  });

  it("toggles password visibility", () => {
    render(<PasswordValidator options={defaultOptions} />);
    const input = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(input).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("applies custom styles", () => {
    const customStyles = {
      container: "custom-container",
      input: "custom-input",
      label: "custom-label",
      button: "custom-button",
      list: "custom-list",
      listItem: "custom-list-item",
    };

    render(
      <PasswordValidator options={defaultOptions} customStyles={customStyles} />
    );

    expect(screen.getByLabelText("Password")).toHaveClass("custom-input");
    expect(screen.getByRole("button")).toHaveClass("custom-button");
    expect(
      screen.getByText("Contains special character (!@#$%^&*)")
    ).toHaveClass("custom-list-item");
  });

  it("calls onValidChange callback with correct values", () => {
    const mockOnValidChange = jest.fn();

    render(
      <PasswordValidator
        options={defaultOptions}
        onValidChange={mockOnValidChange}
      />
    );

    const input = screen.getByLabelText("Password");

    fireEvent.change(input, { target: { value: "Password1!" } });

    expect(mockOnValidChange).toHaveBeenCalledWith("Password1!", true);

    fireEvent.change(input, { target: { value: "pass" } });

    expect(mockOnValidChange).toHaveBeenCalledWith("pass", false);
  });

  it("renders a custom label when provided", () => {
    const customLabel = "Enter your secure password";

    render(<PasswordValidator options={["specialChar"]} label={customLabel} />);

    // Verifica se a label customizada é exibida
    expect(screen.getByLabelText(customLabel)).toBeInTheDocument();
  });

  it("renders the default label when no custom label is provided", () => {
    render(<PasswordValidator options={["specialChar"]} />);

    // Verifica se a label padrão é exibida
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });
});
