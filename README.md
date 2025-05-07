<img width="1389" alt="Captura de Tela 2025-05-07 às 01 54 18" src="https://github.com/user-attachments/assets/34079401-8932-4c70-9da0-a62cc8a36e48" />

# 🔐 Password Validator Library

A **reusable** and **customizable** React component for validating passwords. Designed to be flexible and adaptable to various frontend needs.

---

## 📦 Installation

It is possible to install it via git:

```bash
git clone https://github.com/Joao-Pacheco/qventus-app-password.git
```

After cloning the repository, simply run the following command in the project folder to install the dependencies:

```bash
npm i
```

Then run this other command to start the server:

```bash
npm run dev
```

Now simply open the suggested localhost URL in your browser. On the home page, you’ll see a live example of how the password-validator-lib works (as shown in the image above). This example is located in the /src/pages/ExamplePage.tsx file within the project, in case you want to review its implementation.

Or install the library via npm(yes, I uploaded the project to npm, [here](https://www.npmjs.com/package/password-validator-lib)):

```bash
npm install password-validator-lib
```

---

## 🚀 Usage Example

Here’s how to use the `PasswordValidator` component in your React project:

```tsx
import { PasswordValidator } from "password-validator-lib";

function App() {
  return (
    <PasswordValidator
      options={["digit", "uppercase", "specialChar", "noConsecutive"]}
      onValidChange={(password, isValid) => {
        console.log("Password:", password, "Is valid?", isValid);
      }}
    />
  );
}
```

---

## 🔧 Configuration Options

The `PasswordValidator` component is highly configurable. Below are the available props:

### 1. `options` (required)

An array of predefined validation rules:

| Key             | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `specialChar`   | Must contain at least one special character (!@#\$%^&\*)   |
| `digit`         | Must contain at least one number                           |
| `uppercase`     | Must contain at least one uppercase letter                 |
| `noConsecutive` | Must not contain consecutive repeated letters (e.g., "aa") |

---

### 2. `customRules` (optional)

Add your own validation rules with custom messages:

```ts
customRules={[
  {
    message: "Must contain the word 'secure'",
    validate: (password) => password.includes("secure"),
  },
]}
```

---

### 3. `onValidChange` (optional)

Callback that receives the current password and whether it’s valid:

```ts
onValidChange={(password, isValid) => {
  setIsButtonEnabled(isValid);
}}
```

---

### 4. `customStyles` (optional)

Customize styles using your own CSS classes:

| Key         | Description                     |
| ----------- | ------------------------------- |
| `container` | Wrapper container               |
| `input`     | Password input field            |
| `label`     | Input label                     |
| `button`    | Show/hide password button       |
| `list`      | Validation rules list container |
| `listItem`  | Individual validation rule item |

Example of customization:

```ts
const customStyles = {
  container: "bg-gray-100 p-4 rounded-lg",
  input: "border border-blue-500",
  label: "text-blue-500",
  button: "text-blue-500 hover:text-blue-700",
  list: "mt-4",
  listItem: "text-sm",
};
```

---

### 5. `label` (optional)

Set a custom label for the password input:

```ts
label = "Create your password";
```

---

## 🧪 Running Tests

This project uses **Jest** and **React Testing Library**.

```bash
npm test       # Run all tests
npm test --watch  # Run in watch mode
```

---

## ✅ Where can you see the predefined validation rules?

Go to the following folder

```bash
/src/utils/validators.ts
```

---

## 📚 Cool features i implemented

- 🚀 **I uploaded it to NPM** – Facilitating tests and implementations
- ✅ **Predefined Rules** – Validate common password formats
- ✨ **Custom Rules** – Add your own logic
- 🎨 **Custom Styles** – Easily match your design system
- ⚡ **Real-time Validation** – Feedback as the user types

---

## 🌟 Features that if I had more time I would implement

- ✅ Ideally, the component and the test page would be separated into different repositories — one for the library itself and another for showcasing usage examples. This separation would make the project structure much cleaner, more organized, and easier to maintain. However, to simplify testing and evaluation for now, I decided to keep both the component and the example page in the same repository
- 🔒 A visual password security meter
- 🧪 An automatic secure password generator
- ⚡ when a custom style is called, override the original by disabling it
- 🗣️ Internationalization (i18n)
- ⚙️ Custom error messages
- ♿ Improved accessibility (WCAG)

---

## 🧑‍💻 Author

Made with 💙 for João Pacheco for Qventus' technical challenge
