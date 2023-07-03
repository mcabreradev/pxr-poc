# Paxer Ecommerce

<div align="center">
  <img src="https://acontraluz.paxer.com/media/paxer/img/logo_completo/with-bg/logo_paxer_bg_white-320.png" />
</div>

## Stack

- ⚡️ Next.js 13
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3
- 💅 Styled Components
- 🃏 Jest — Configured for unit testing
- 📏 ESLint — Find and fix problems in your code, also will **auto sort** your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- 🔥 Snippets — A collection of useful snippets
- 🗺 Site Map — Automatically generate sitemap.xml
- 📦 Yarn
- 🈸 Internationalization (i18n)
- 🛒 Redux Toolkit
- 🔌 React Query
- Formik
- Storybook
- Yarn

---

## Prerequisites

Paxer Ecommerce requires that you have installed the following in order to run locally:

- Use node v16
  - If you're using `nvm`, it's as easy as running `nvm install`. Our `.nvmrc` already specifies the correct version
  - To make sure nvm loads the correct version every new terminal, follow [this guide](https://github.com/nvm-sh/nvm#nvmrc)
  - If you're using node some other way, make sure you're using the correct version, follow [this guide](https://nodejs.org/en/download/)
- Use `yarn`

  - There is no problems using NPM, but we encourage you to use `yarn` in this project, follow [this guide](https://classic.yarnpkg.com/en/docs/install)

- Copy the `.env.example` file, rename it to `.env` and set the corresponding values for each variable.

## Getting Started

### 1. Clone the repository:

```bash
git clone git@github.com:Prinhotels/Paxer-ecomm.git
```

### 2. Install dependencies

It is encouraged to use **yarn** so the husky hooks can work properly.

```bash
yarn install
```

### 3. Run the development server

You can start the server using this command:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Run the build script

First, build the app using this command:

```bash
yarn build
```

### 5. Run the production server

You can start the server using this command:

```bash
yarn start
```

### 6. Commit Message Convention

This starter is using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), it is mandatory to use it to commit changes.

- build: changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: documentation only changes
- feat: a new feature
- fix: a bug fix
- perf: a code change that improves performance
- refactor: a code change that neither fixes a bug nor adds a feature
- style: changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: adding missing tests or correcting existing tests
- chore: updating npm tasks etc; no production code change
- revert: revert to a commit
- wip: work in progress

Let's say you're working on ticket PXR-1017. A valid commit message will be:

```
feat(customer): PXR-1017 add customer reservation
```

more info follow [Angular Convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

---

## Styleguide

### React Functional Components

As standard project Paxer-Ecomm will use react functional components for each component created.

```javascript
function Hotel() {
  const text = 'Hello Customer';

  return (
    <div className='App'>
      <h1> {text} </h1>
    </div>
  );
}
```

### Styled Components

Paxer-Ecomm follows the styled components standards:

```typescript
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  color: #bf4f74;
`;

function Hotel() {
  const text = 'Hello Customer';

  return (
    <div className='App'>
      <Title> {text} </Title>
    </div>
  );
}
```

More information about typing [Styled Components](https://styled-components.com/docs/basics#getting-startedt)

### Tailwind CSS

Tailwinds CSS is a utility-first CSS framework for rapidly building custom user interfaces.

```typescript
function Hotel() {
  const text = 'Hello Customer';

  return (
    <div className='App'>
      <h1 className='text-center text-xl text-pink-700'>{text}</h1>
    </div>
  );
}
```

### Tailwind CSS with Styled Components

We can create Tailwind CSS + React components like styled components with classes name on multiple lines. Here is an example:

```typescript
import tw from 'tailwind-styled-components';

const Title = tw.h1`
  text-xl 
  text-center 
  text-pink-700
`;

function Hotel() {
  const text = 'Hello Customer';

  return (
    <div className='App'>
      <Title> {text} </Title>
    </div>
  );
}
```

For more information follow [this guide](https://www.npmjs.com/package/tailwind-styled-components)

### i18n

This project use [i18next](https://react.i18next.com/) to enable internationalization, but primary use here will be enable quick change and maintainability of wording of the app.

Usage examples

```typescript
function MyComponent() {
  const { t } = useTranslation();

  return <p>{t('my translated text')}</p>;
}
```

### Storybook

Storybook is a tool for UI development. It makes development faster and easier by isolating components.

```bash
yarn stoybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

### Testing

Testing is a very important part of the development process. We use Jest as our test runner and React Testing Library to test our components.

```bash
yarn test
```
