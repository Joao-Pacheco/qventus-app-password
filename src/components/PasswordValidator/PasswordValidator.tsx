import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./styles.css";
import { validatePassword } from "../../utils/validators";
import view from "../../assets/view.png";
import hide from "../../assets/hide.png";

export type RequirementType =
  | "specialChar"
  | "digit"
  | "uppercase"
  | "noConsecutive";

interface CustomRule {
  message: string;
  validate: (password: string) => boolean;
}

interface CustomStyles {
  container?: string;
  input?: string;
  label?: string;
  button?: string;
  list?: string;
  listItem?: string;
}

interface Props {
  options: RequirementType[];
  customRules?: CustomRule[];
  onValidChange?: (password: string, isValid: boolean) => void;
  customStyles?: CustomStyles;
  label?: string;
}

export const PasswordValidator: React.FC<Props> = ({
  options,
  customRules = [],
  onValidChange,
  customStyles = {},
  label = "Password",
}) => {
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validations = useMemo(
    () => validatePassword(password, options),
    [password, options]
  );

  const customValidations = useMemo(
    () =>
      customRules.map((rule) => ({
        message: rule.message,
        isValid: rule.validate(password),
      })),
    [password, customRules]
  );

  useEffect(() => {
    if (onValidChange) {
      const isValid =
        Object.values(validations).every(Boolean) &&
        customValidations.every((rule) => rule.isValid);
      onValidChange(password, isValid);
    }
  }, [validations, customValidations, password, onValidChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setPassword(e.target.value);
      if (!hasStartedTyping) {
        setHasStartedTyping(true);
      }
    },
    [hasStartedTyping]
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => {
    if (password === "") {
      setIsFocused(false);
      setHasStartedTyping(false);
    }
  }, [password]);

  const togglePasswordVisibility = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );

  return (
    <div className={`relative w-full max-w-sm ${customStyles.container || ""}`}>
      <div className="relative">
        <input
          id="password"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={showPassword ? "text" : "password"}
          value={password}
          className={`input-field ${customStyles.input || ""}`}
        />
        <label
          htmlFor="password"
          className={`label ${
            isFocused || password
              ? "top-1 text-xs text-[#7395cf]"
              : "top-4 text-base text-gray-400"
          } ${customStyles.label || ""}`}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`show-password ${customStyles.button || ""}`}
        >
          <img
            src={showPassword ? hide : view}
            alt="Toggle password visibility"
            className="show-password-icon"
          />
        </button>
      </div>
      <ul className={`list ${customStyles.list || ""}`}>
        {options.map((req) => (
          <li
            key={req}
            className={`${
              !hasStartedTyping
                ? "neutral"
                : validations[req]
                ? "valid"
                : "invalid"
            } ${customStyles.listItem || ""}`}
          >
            {getMessage(req)}
          </li>
        ))}
        {customValidations.map((rule, index) => (
          <li
            key={`custom-${index}`}
            className={`${
              !hasStartedTyping ? "neutral" : rule.isValid ? "valid" : "invalid"
            } ${customStyles.listItem || ""}`}
          >
            {rule.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getMessage = (req: RequirementType): string => {
  const messages = {
    specialChar: "Contains special character (!@#$%^&*)",
    digit: "Contains a number",
    uppercase: "Contains an uppercase letter",
    noConsecutive: "No consecutive letters",
  };
  return messages[req];
};
