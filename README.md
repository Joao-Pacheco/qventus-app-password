````md
# 🔐 Password Validator Lib

Um componente React reutilizável para validação de senha, configurável por props. Criado para ser usado em múltiplos frontends com requisitos distintos.

---

## 📦 Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/qventus-password-validator.git
cd qventus-password-validator
```
````

### 2. Instalar dependências

```bash
npm install
```

> 💡 Este projeto utiliza **Vite** e **TypeScript**.

---

## 🚀 Rodando o projeto localmente

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador para ver o componente em ação.

---

## 🧪 Executando os testes

O projeto usa **Jest** e **React Testing Library** para testes automatizados.

```bash
npm run test
```

Para rodar os testes em modo watch (útil durante o desenvolvimento):

```bash
npm run test:watch
```

---

## 💡 Exemplo de uso

No seu app:

```tsx
import { PasswordValidator } from "./components/PasswordValidator";

const App = () => (
  <PasswordValidator
    options={["specialChar", "digit", "uppercase", "noConsecutive"]}
  />
);
```

---

## 🔧 Requisitos disponíveis

Você pode configurar o componente com qualquer combinação dos seguintes requisitos:

| Chave (`options[]`) | Requisito                                                 |
| ------------------- | --------------------------------------------------------- |
| `specialChar`       | Deve conter pelo menos um caractere especial (!@#\$%^&\*) |
| `digit`             | Deve conter ao menos um número                            |
| `uppercase`         | Deve conter ao menos uma letra maiúscula                  |
| `noConsecutive`     | Não deve conter letras consecutivas repetidas (ex: "aa")  |

---

## 📚 Futuras melhorias

- Suporte a mensagens de erro customizadas via props
- Internacionalização (i18n)
- Validações assíncronas (ex: força da senha via API)
- Publicação como pacote NPM

---

## 🧑‍💻 Feito com 💙 para o desafio técnico da Qventus

```

---
```
