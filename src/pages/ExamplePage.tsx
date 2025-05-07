import React, { useState } from "react";
import PasswordValidator from "../components/PasswordValidator/PasswordValidator";
import "./styles.css";
import { Toaster, toast } from "sonner";

const ExamplePage: React.FC = () => {
  const [valueUserName, setValueUserName] = useState("");
  //Password value if needed
  const [valueUPassWord, setValueUPassWord] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isUserNameValid, setIsUserNameValid] = useState<boolean>(false);

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

  const handlePasswordChange = (value: string, valid: boolean) => {
    setValueUPassWord(value);
    setIsPasswordValid(valid);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsUserNameValid(e.target.value.length > 0);
    setValueUserName(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (valueUserName === "") {
      setIsFocused(false);
    }
  };

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
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="input-field"
              />
              <label
                htmlFor="name"
                className={` label ${
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
              onClick={() => toast.success("Senha válida!")}
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
