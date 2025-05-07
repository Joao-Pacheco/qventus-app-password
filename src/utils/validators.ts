import { RequirementType } from "../components/PasswordValidator/PasswordValidator";

export const validatePassword = (
  password: string,
  options: RequirementType[]
) => {
  const result: Record<RequirementType, boolean> = {
    specialChar: /[!@#$%^&*]/.test(password),
    digit: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    noConsecutive: !/(.)\1/.test(password),
  };

  return Object.fromEntries(
    options.map((key) => [key, result[key]])
  ) as typeof result;
};
