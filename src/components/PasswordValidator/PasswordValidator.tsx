import React, { useState } from "react";
import styles from "./styles.css";
import { validatePassword } from "../../utils/validators";

export type RequirementType =
  | "specialChar"
  | "digit"
  | "uppercase"
  | "noConsecutive";

interface Props {
  options: RequirementType[];
}

const PasswordValidator: React.FC<Props> = ({ options }) => {
  const [password, setPassword] = useState("");

  const validations = validatePassword(password, options);

  return (
    <div className="wrapper">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <ul>
        {options.map((req) => (
          <li key={req} className={validations[req] ? "valid" : "invalid"}>
            {getMessage(req)}
          </li>
        ))}
      </ul>
    </div>
  );
};

const getMessage = (req: RequirementType): string => {
  const messages = {
    specialChar: "Contains special character (!@#$%^&*)",
    digit: "Contains a number",
    uppercase: "Contains an uppercase letter",
    noConsecutive: "No consecutive letters",
  };
  return messages[req];
};

export default PasswordValidator;
