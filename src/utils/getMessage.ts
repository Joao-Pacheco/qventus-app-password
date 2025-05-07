import { RequirementType } from "../components/PasswordValidator/PasswordValidator";

export const getMessage = (req: RequirementType): string => {
  const messages = {
    specialChar: "Contains special character (!@#$%^&*)",
    digit: "Contains a number",
    uppercase: "Contains an uppercase letter",
    noConsecutive: "No consecutive letters",
  };
  return messages[req];
};
