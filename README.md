# Creating the `Nuxt 4` Project

```bash
npm create nuxt@latest <project-name>
```

- Choose necessary configuration on create time, add modules:
  `@nuxt/content`,
  `@nuxt/eslint`,
  `@nuxt/icon`,
  `@nuxt/image`,
  `@nuxt/test-utils`,
  ...
- add `Pinia`:

```bash
npx nuxi@latest module add pinia
```

- Add Sass (SCSS) Suppor:

```bash
npm install -D sass
```

_create `main.scss` file `app/assets/main.scss`_

_in nuxt.config.ts add_:

```ts
export default defineNuxtConfig({
  css: ['@/assets/main.scss'],
})
```

- App `Prettier` and `eslint-config-prettier`:

```bash
npm install -D prettier eslint-config-prettier
```

_Create a `.prettierrc` file in your root_:

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

_Create a `.prettierignore` file in your root_:

```md
node_modules
dist
.output
.nuxt
```

_If you're using `ESLint`, extend `Prettier` in your config to disables conflicting ESLint rules_:

_Create a `.eslintrc.js`file in your root_:

```js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@nuxt/eslint-config',
    'prettier', // <-- disables conflicting ESLint rules
  ],
}
```

_In package.json, add Format Scripts_:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

_Use in VS Code (Optional)_
_Install the `Prettier` VS Code extension, then in `.vscode/settings.json`_:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

**_Usage_**
_Format your code manually_:

```bash
npm run format
```

_Or check formatting_:

```bash
npm run format:check
```

## Type-checking

- By default, Nuxt doesn't check types when you run nuxt `dev` or nuxt `build`, for performance reasons.
  To enable type-checking at build or development time, install `vue-tsc` and `typescript` as development dependency:

```sh
npm install --save-dev vue-tsc typescript
```

- Nuxt’s built-in type checking slows down hot-reload a bit.
  A faster pattern is:
  **_Dev mode_**: Run Nuxt with `typeCheck: false` (no blocking on reloads)
  - set in `defineNuxtConfig`: `typeCheck: process.env.NODE_ENV === 'production'`

```ts
export default defineNuxtConfig({
  typescript: {
    typeCheck: process.env.NODE_ENV === 'production',
  },
})
```

**_`TS` to not complain on `process.env.NODE_ENV` we should install node types_**:

```bash
npm i --save-dev @types/node
```

**_Add typecheck scripts to `package.json`_**:

```json
"scripts": {
  "typecheck": "nuxt typecheck",
  "typecheck-watch": "vue-tsc --project .nuxt/tsconfig.json --noEmit --watch"
},
```

_**Parallel type check in Dev mode**_:
_**in another terminal**_: `npm run typecheck-watch`

**_Add to tsconfig.json_**:

```json
"compilerOptions": {
  "strict": true,
  "forceConsistentCasingInFileNames": true,
  "noImplicitReturns": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

# ESLint Module [(docs)](https://eslint.nuxt.com/packages/module)

- Quick Setup:

**_Add @nuxt/eslint if it is not installed._**

```sh
npx nuxt module add eslint
```

**_install extra dependencies `vite-plugin-eslint2` for Vite_**

```sh
npm i -D vite-plugin-eslint2
```

**_configs in `eslint.config.mjs`_**

```ts
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      // 'no-console': ['error', { allow: ['warn', 'error'] }], // allow console.warn, console.error but not-allow console.log in TypeScript files
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always', // <img />
            normal: 'always', // <div />
            component: 'always', // <MyComponent />
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
)
```

- ESLint configs in nuxt.config.ts

```ts
import eslint from 'vite-plugin-eslint2'

export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  eslint: {
    // options here
    checker: true, // for ESLint checking when runing dev server, using `vite-plugin-eslint2` (NOT on the build time!)
  },

  vite: {
    plugins: [eslint({ include: ['**/*.{ts,vue}'], exclude: ['node_modules', '.nuxt'] })],
  },
})
```

- ESLint scripts in package.json

```json
"scripts": {
  "build": "eslint . && nuxt build", // to check ESLint before the build
  "lint": "eslint .",
  "lint:fix": "eslint . --fix"
},
```

## Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
