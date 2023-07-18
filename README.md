<div align="center">
  <img src="https://acontraluz.paxer.com/media/paxer/img/logo_completo/with-bg/logo_paxer_bg_white-320.png" />
</div>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Stack](#stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the repository:](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Run the development server](#3-run-the-development-server)
  - [4. Run the build script](#4-run-the-build-script)
  - [5. Run the production server](#5-run-the-production-server)
  - [6. Commit Message Convention](#6-commit-message-convention)
- [Styleguide](#styleguide)
  - [React Functional Components](#react-functional-components)
  - [Styled Components](#styled-components)
  - [Tailwind CSS](#tailwind-css)
  - [Tailwind CSS with Styled Components](#tailwind-css-with-styled-components)
- [i18n](#i18n)
- [Storybook](#storybook)
- [Testing](#testing)
- [React Query](#react-query)
  - [What is React Query?](#what-is-react-query)
  - [Why React Query?](#why-react-query)
  - [How to use React Query?](#how-to-use-react-query)
- [Formik](#formik)
  - [What is Formik?](#what-is-formik)
  - [Why Formik?](#why-formik)
  - [How to use Formik?](#how-to-use-formik)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
- ~~Docker~~
- ~~PNPM~~

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

# Styleguide

## React Functional Components

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

## Styled Components

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

## Tailwind CSS

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

## Tailwind CSS with Styled Components

We can create Tailwind CSS + React components like styled components with classes name on multiple lines. Here is an example:

```typescript
import tw from 'tailwind-styled-components';

const Title = tw.h1`
  text-center
  text-xl
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

# i18n

This project use [i18next](https://react.i18next.com/) to enable internationalization, but primary use here will be enable quick change and maintainability of wording of the app.

Usage examples

```typescript
function MyComponent() {
  const { t } = useTranslation();

  return <p>{t('my translated text')}</p>;
}
```

# Storybook

Storybook is a tool for UI development. It makes development faster and easier by isolating components.

storybook file example:

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import Footer from './';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    className: 'bg-gray-100',
  },
};
```

To run the storybook use the following command:

```bash
yarn stoybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

# Testing

Testing is a very important part of the development process. We use Jest as our test runner and React Testing Library to test our components.

Jest test example:

```typescript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

To run the tests use the following command:

```bash
yarn test
```

# React Query

## What is React Query?

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your React applications a breeze.

## Why React Query?

- **It's simple** - React Query is designed to make network requests easy and painless. By providing a concise query syntax and removing the need to manage your own cache, you can simplify your code and your application's mental model.
- **It's powerful** - React Query is packed with features that will make your application hum with performance. From automatic refetching to pagination and infinite query support, you can build a feature rich app with minimal effort.
- **It's familiar** - React Query's query syntax is modeled after the popular GraphQL query language and can be used to fetch data from any API, whether it's REST, GraphQL, or something else.
- **It's extensible** - React Query's plugin system allows you to extend and customize React Query to fit your needs. From custom cache implementations to custom query resolvers, you can customize React Query to your heart's content.

## How to use React Query?

```typescript
import { useQuery } from 'react-query';

function App() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('http://api.service').then((res) => res.json())
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </div>
  );
}
```

For more information follow [this guide](https://react-query.tanstack.com/overview)

# Formik

## What is Formik?

Formik is the world's most popular open source form library for React and React Native. It helps with the three most annoying parts:

- Getting values in and out of form state
- Validation and error messages
- Handling form submission

## Why Formik?

- **Build forms in React, without the tears** - Formik takes care of the repetitive and annoying stuff--keeping track of values/errors/visited fields, orchestrating validation, and handling submission--so you don't have to.
- **Simple React validation** - Yup is a dead simple JavaScript object schema validator and object parser. We leverage it to simplify your code and keep it DRY.
- **Tiny size without dependencies** - Formik is a small library that helps you with the 3 most annoying parts: getting values in and out of form state, validation, and handling submission errors.
- **Access to all React features** - Formik is designed to manage forms with complex validation with ease. It handles complicated stuff like nested objects and arrays for you.
- **Compatible with React Native** - Formik supports synchronous and asynchronous form-level and field-level validation. Furthermore, it comes with baked-in support for schema-based form-level validation through Yup.

## How to use Formik?

```typescript
import { Formik, Form, Field, ErrorMessage } from 'formik';

function App() {
  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type='email' name='email' />
            <ErrorMessage name='email' component='div' />
            <Field type='password' name='password' />
            <ErrorMessage name='password' component='div' />
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
```

For more information follow [this guide](https://formik.org/docs/overview)
