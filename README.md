# React Patterns Demo

## ℹ️ Overview

A collection of small, focused examples demonstrating common React patterns, rendering strategies, and popular libraries used in modern React applications.

The goal of this project is to provide simple, easy-to-understand examples that illustrate how different approaches affect component rendering, state management, and application architecture.

## 🛠 Features

### Rendering Optimization

Examples demonstrating techniques for reducing unnecessary component re-renders.

- **Poor Handling** – Demonstrates how parent state updates can unnecessarily trigger child component re-renders.
- **State Isolation (Component Colocation)** – Keeps state close to where it is used so unrelated components render independently.
- **Component Composition** – Uses reusable container components with the `children` prop while maintaining isolated child state.
- **Memoization** – Uses `React.memo()` to avoid unnecessary child re-renders when props have not changed.

### React Libraries

Examples showing how common libraries simplify application development.

- **React Hook Form** – Form state management and validation.
- **Zod** – Runtime schema validation with TypeScript support.
- **TanStack Query** – Server-state management, caching, and asynchronous data fetching.
- **Zustand** – Lightweight client-side state management.

## 💡 Purpose

This project is intended as a learning resource for developers who want to better understand:

- React rendering behavior
- State management strategies
- Component composition
- Performance optimization techniques
- Modern React tooling

Each example is intentionally small and focused on demonstrating a single concept.

## 🛠 Technologies

- React
- TypeScript
- Vite
- React Hook Form
- Zod
- TanStack Query
- Zustand

## 🚀 Running the Project

```bash
npm install
npm run dev
```

Then open the local development server displayed by Vite.

## 📄 License

MIT
