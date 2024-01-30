<div align="center">
  <img src="https://acontraluz.paxer.com/media/paxer/img/logo_completo/with-bg/logo_paxer_bg_white-320.png" />
</div>

[![Code Check](https://github.com/Prinhotels/paxer-ecomm/actions/workflows/lint.yml/badge.svg?branch=dev)](https://github.com/Prinhotels/paxer-ecomm/actions/workflows/lint.yml)

## Tech Stack

- ⚡️ Next.js 14
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
- 📦 Bun - An all-in-one toolkit for JavaScript and TypeScript apps
- 🈸 Internationalization (i18n)
- 🐻 Zustand - A state management library for React
- 🔌 React Query - Server state management
- 📄 React Hook Form - Performant, flexible and extensible forms with easy-to-use validation
- 💎 Storybook - A frontend workshop for building UI components and pages in isolation
- 🙂 SVG Icons by [Iconify](https://iconify.design/)
- 🛃 Github Actions
- 📅 Calendar [react-datepicker](https://reactdatepicker.com)

TODO:

- Playwright / e2e - Enables reliable end-to-end testing

---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the repository:](#1-clone-the-repository)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Run the development server](#3-run-the-development-server)
  - [4. Run the build script](#4-run-the-build-script)
  - [5. Run the production server](#5-run-the-production-server)
  - [6. Commit Message Convention](#6-commit-message-convention)
- [React Functional Components](#react-functional-components)
- [Styled Components](#styled-components)
- [Tailwind CSS](#tailwind-css)
- [Tailwind CSS with Styled Components](#tailwind-css-with-styled-components)
- [i18n](#i18n)
- [Storybook](#storybook)
- [Testing](#testing)
- [React Query](#react-query)
  - [How to use React Query?](#how-to-use-react-query)
- [React Hook Form](#react-hook-form)
  - [How to use React Hook Form?](#how-to-use-react-hook-form)
- [Zustand](#zustand)
  - [What is Zustand?](#what-is-zustand)
  - [How to use Zustand?](#how-to-use-zustand)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Prerequisites

Paxer Ecommerce requires that you have installed the following in order to run locally:

- Use node v18
  - If you're using `nvm`, it's as easy as running `nvm install`. Our `.nvmrc` already specifies the correct version
  - To make sure nvm loads the correct version every new terminal, follow [this guide](https://github.com/nvm-sh/nvm#nvmrc)
  - If you're using node some other way, make sure you're using the correct version, follow [this guide](https://nodejs.org/en/download/)
- Use [`pnpm`](https://pnpm.io/)

  - There is no problems using NPM, but we encourage you to use `pnpm` in this project, follow [this guide](https://pnpm.io/installation)

- Copy the `.env.example` file, rename it to `.env` and set the corresponding values for each variable.

## Getting Started

### 1. Clone the repository:

```bash
git clone git@github.com:Prinhotels/Paxer-ecomm.git
```

### 2. Install dependencies

It is encouraged to use **pnpm** so the husky hooks can work properly.

```bash
pnpm install
```

### 3. Run the development server

You can start the server using this command:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Run the build script

First, build the app using this command:

```bash
pnpm run build
```

### 5. Run the production server

You can start the server using this command:

```bash
pnpm run start
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
pnpm run stoybook
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
pnpm run test
```

# React Query

## How to use React Query?

```typescript
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProperty = async (hotid: string) => {
  const { data } = await axios.get('/api/property?hotid=' + hotid);
  return data;
};

export default function useQueryProperty(hotid: string) {
  return useQuery({
    queryKey: ['queryProperty', hotid],
    queryFn: () => fetchProperty(hotid),
  });
}
```

Usage example:

```typescript
import { useQueryProperty } from 'hooks';

function Hotel() {
  const { data, isLoading, error } = useQueryProperty('123456');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='App'>
      <h1> {data.name} </h1>
    </div>
  );
}
```

For more information follow [this guide](https://react-query.tanstack.com/overview)

# React Hook Form

## How to use React Hook Form?

```typescript
import { useForm, SubmitHandler } from 'react-hook-form';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register('firstName')} />
      <label>Gender Selection</label>
      <select {...register('gender')}>
        <option value='female'>female</option>
        <option value='male'>male</option>
        <option value='other'>other</option>
      </select>
      <input type='submit' />
    </form>
  );
}
```

# Zustand

## What is Zustand?

Zustand is a small, fast and scalable bearbones state-management solution. It has a familiar API (based on hooks) and comes with a great set of tools and features that will make your life easier and your code cleaner.

## How to use Zustand?

```typescript
import create from 'zustand';

type StateType = {
  count: number;
  inc: () => void;
  dec: () => void;
};

export const useStore = create<StateType>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));
```

Usage example:

```typescript
import { useStore } from './store';

function Counter() {
  const { count, inc, dec } = useStore();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </div>
  );
}
```

For more information follow [this guide](https://zustand.surge.sh/)
