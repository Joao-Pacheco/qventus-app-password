import React, { useState, useCallback } from "react";
import PasswordValidator from "../components/PasswordValidator/PasswordValidator";
import "./styles.css";
import { Toaster, toast } from "sonner";

const ExamplePage: React.FC = () => {
  const [valueUserName, setValueUserName] = useState("");
  // State to manage the password input if needed
  const [valuePassword, setValuePassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isUserNameValid, setIsUserNameValid] = useState(false);

  const customRules = [
    {
      message: "Must be at least 10 characters long",
      validate: (password: string) => password.length >= 10,
    },
    {
      message: "Cannot contain the word 'password'",
      validate: (password: string) =>
        !password.toLowerCase().includes("password"),
    },
  ];

  const handlePasswordChange = useCallback((value: string, valid: boolean) => {
    setValuePassword(value);
    setIsPasswordValid(valid);
  }, []);

  const handleUserNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValueUserName(value);
      setIsUserNameValid(value.trim().length > 0);
    },
    []
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => {
    if (valueUserName.trim() === "") {
      setIsFocused(false);
    }
  }, [valueUserName]);

  const handleSubmit = useCallback(() => {
    toast.success("Password and username are valid!");
  }, []);

  return (
    <div className="page">
      <Toaster richColors position="top-right" />
      <div className="page-container">
        <div className="side">
          <h1 className="side-title">Password Validator</h1>
          <p className="side-description">
            This example shows how to use the password validator component.
          </p>

          <div className="side-inputs">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                id="name"
                placeholder=" "
                value={valueUserName}
                onChange={handleUserNameChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="input-field"
              />
              <label
                htmlFor="name"
                className={`label ${
                  isFocused || valueUserName
                    ? "top-1 text-xs text-[#7395cf]"
                    : "top-4 text-base text-gray-400"
                }`}
              >
                UserName
              </label>
            </div>

            <PasswordValidator
              onValidChange={handlePasswordChange}
              customRules={customRules}
              options={["specialChar", "digit", "uppercase", "noConsecutive"]}
            />

            <button
              disabled={!isPasswordValid || !isUserNameValid}
              className="submit-button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="side background-image max-md:hidden">
          <div className="overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default ExamplePage;
