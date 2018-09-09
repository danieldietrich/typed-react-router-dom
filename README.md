# Typed React Router

This library is a type-safe verion of the [DOM bindings](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) for [React Router](https://github.com/ReactTraining/react-router).

**It is intended to be used with [TypeScript](https://www.typescriptlang.org)**.

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save typed-react-router-dom react-router-dom

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```ts
import { TypedReactRouter } from 'typed-react-router-dom';

interface IAppRoutes {
    '/login/:name': { name: string }
    '/': {}
}

const { BrowserRouter, Route, Link } = new TypedReactRouter<IAppRoutes>();
```
