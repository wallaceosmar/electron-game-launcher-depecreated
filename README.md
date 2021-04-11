# Vite Electron React Builder Boilerplate v2

[![GitHub issues by-label](https://img.shields.io/github/issues/wallaceosmar/vite-electron-react-builder/help%20wanted?label=issues%20need%20help&logo=github)](https://github.com/wallaceosmar/vite-electron-react-builder/issues?q=label%3A%22help+wanted%22+is%3Aopen+is%3Aissue)
[![Minimal node version](https://img.shields.io/static/v1?label=node&message=%3E=14.16&logo=node.js&color)](https://nodejs.org/about/releases/)
[![Minimal npm version](https://img.shields.io/static/v1?label=npm&message=%3E=7.7&logo=npm&color)](https://github.com/npm/cli/releases)

> Vite+Electron = 🔥

> This is a fork of [vite-electron-builder](https://github.com/cawa-93/vite-electron-builder) made by  [Alex Kozack][cawa-93-github] You can [💖 sponsor him][wallaceosmar-sponsor] for continued development of his template.

This is a secure template for electron applications. Written following the latest safety requirements, recommendations and best practices.

Under the hood is used [Vite] — super fast, nextgen bundler, and [electron-builder] for compilation.


___
### Support
- This template maintained by [Wallace osmar][wallaceosmar-github]. You can [💖 sponsor him][wallaceosmar-sponsor] for continued development of this template.

- Found a problem? Pull requests are welcome.

- If you have ideas, questions or suggestions - **Welcome to [discussions](https://github.com/wallaceosmar/vite-electron-react-builder/discussions)**. 😊
___




## Get started

Follow these steps to get started with this template:

1. Click the **[Use this template](https://github.com/wallaceosmar/vite-electron-react-builder/generate)** button.
    
   **Note**: Only the `main` branch matters. You do not need to include any other branches when creating the repository.
   
That's all you need. 😉

## Features

### Electron [![Electron version](https://img.shields.io/github/package-json/dependency-version/wallaceosmar/vite-electron-react-builder/dev/electron?label=%20)][electron]
- Template use the latest electron version with all the latest security patches.
- The architecture of the application is built according to the security [guids](https://www.electronjs.org/docs/tutorial/security) and best practices.
- The latest version of the [electron-builder] is used to compile the application.


### Vite [![Vite version](https://img.shields.io/github/package-json/dependency-version/wallaceosmar/vite-electron-react-builder/dev/vite?label=%20)][vite]
- [Vite] is used to bundle all source codes. This is an extremely fast packer that has a bunch of great features. You can learn more about how it is arranged in [this](https://youtu.be/xXrhg26VCSc) video.
- Vite [supports](https://vitejs.dev/guide/env-and-mode.html) reading `.env` files. My template has a separate command to generate `.d.ts` file with type definition your environment variables.

Vite provides you with many useful features, such as: `TypeScript`, `TSX/JSX`, `CSS/JSON Importing`, `CSS Modules`, `Web Assembly` and much more.

[See all Vite features](https://vitejs.dev/guide/features.html).


### TypeScript [![TypeScript version](https://img.shields.io/github/package-json/dependency-version/wallaceosmar/vite-electron-react-builder/dev/typescript?label=%20)][typescript] (optional)
- The Latest TypeScript is used for all source code. 
- **Vite** supports TypeScript out of the box. However, it does not support type checking.
- Code formatting rules follow the latest TypeScript recommendations and best practices thanks to [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin).

**Note**: If you do not need a TypeScript, you can easily abandon it. To do this, You do not need to make any bundler configuration changes, etc. Just replace all `.ts` files with `.js` files. Additionally, it will be useful to delete TS-specific files, plug-ins and dependencies like `tsconfig.json`, `@typescript-eslint/*`, etc.


### React [![React version](https://img.shields.io/github/package-json/dependency-version/wallaceosmar/vite-electron-react-builder/react?label=%20)][react] (optional)

- Installed [React devtools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=pt).

See [examples of web pages for different frameworks](https://github.com/vitejs/vite/tree/main/packages/create-app).

### Continuous Integration
- The configured workflow for check the types for each push and PR.
- The configured workflow for check the code style for each push and PR.
- **Automatic tests** used [spectron]. Simple, automated test check:
  - Does the main window created and visible?
  - Is the main window not empty?
  - Is dev tools closed?
  

### Continuous delivery
- Each time you push changes to the `main` branch, [`release`](.github/workflows/release.yml) workflow starts, which creates release draft.
  - The version is automatically set based on the current date in the format "yy.mm.dd".
  - Notes are automatically generated and added to the release draft.
  - Code signing supported. See [`compile` job in `release` workflow](.github/workflows/release.yml).
- **Auto-update is supported**. After the release will be published, all client applications will download the new version and install updates silently.


## Status — WIP

This template was created to make my work easier. It may not be universal, but I try to keep it that way.

I am actively involved in its development. But I do not guarantee that this template will be maintained in the future.


**At the moment, there are the following problems:**

- ⚠ Some files require refactoring.
- ⚠ Watch mode for the `main` and `preload` entry points should be improved. Blocked by  [vite#1434](https://github.com/vitejs/vite/issues/1434).
- ⚠ Release notes are created automatically based on commit history. [`scripts/release-notes.js`](scripts/release-notes.js) is used for generation. It may not provide some scenarios. If you encounter a problem - write about it.
- ⏳ I want to migrate all code base to ESM. But because Nodejs  ecosystem is unprepared I not known whether this will give more benefits or more inconvenience.

Some improvement or problems can be listed in [issues](https://github.com/wallaceosmar/vite-electron-react-builder/issues).

**Pull requests are welcome**.

## How it works
The template required a minimum [dependencies](package.json). Only **Vite** is used for building, nothing more.

### Project Structure

The structure of this template is very similar to the structure of a monorepo.

The entire source code of the program is divided into three modules (packages) that are bundled each independently:
- [`packages/main`](packages/main)
Electron [**main script**](https://www.electronjs.org/docs/tutorial/quick-start#create-the-main-script-file).
- [`packages/preload`](packages/preload)
Used in `BrowserWindow.webPreferences.preload`. See [Checklist: Security Recommendations](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content).
- [`packages/renderer`](packages/renderer)
Electron [**web page**](https://www.electronjs.org/docs/tutorial/quick-start#create-a-web-page).

### Build web resources

Packages `main` and `preload` are built in [library mode](https://vitejs.dev/guide/build.html#library-mode) as it is a simple javascript.
`renderer` package build as regular web app.

The build of web resources is performed in the [`scripts/build.js`](scripts/build.js). Its analogue is a sequential call to `vite build` for each package.

### Compile App
Next step is run  packaging and compilation a ready for distribution Electron app for macOS, Windows and Linux with "auto update" support out of the box. 

To do this, using the [electron-builder]:
- In npm script `compile`: This script is configured to compile the application as quickly as possible. It is not ready for distribution, is compiled only for the current platform and is used for debugging.
- In GitHub Action: The application is compiled for any platform and ready-to-distribute files are automatically added to the draft GitHub release. 


### Using Node.js API in renderer
According to [Electron's security guidelines](https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content), Node.js integration is disabled for remote content. This means that **you cannot call any Node.js api in the `packages/renderer` directly**. To do this, you **must** describe the interface in the `packages/preload` where Node.js api is allowed:
```ts
// packages/preload/src/index.ts
import {readFile} from 'fs/promises'

const api = {
  readConfig: () =>  readFile('/path/to/config.json', {encoding: 'utf-8'}),
}

contextBridge.exposeInMainWorld('electron', api)
```

```ts
// packages/renderer/src/App.tsx
import {useElectron} from '/@/use/electron'

const App: React.FC = () => {
  ...
  const {readConfig} = useElectron();
  ...
}
```

[Read more about Security Considerations](https://www.electronjs.org/docs/tutorial/context-isolation#security-considerations).

**Note**: Context isolation disabled for `test` environment. See [#693](https://github.com/electron-userland/spectron/issues/693#issuecomment-747872160).



### Modes and Environment Variables
All environment variables set as part of the `import.meta`, so you can access them as follows: `import.meta.env`. 

You can also build type definitions of your variables by running `scripts/buildEnvTypes.js`. This command will create `types/env.d.ts` file with describing all environment variables for all modes.

The mode option is used to specify the value of `import.meta.env.MODE` and the corresponding environment variables files that needs to be loaded.

By default, there are two modes:
  - `production` is used by default
  - `development` is used by `npm run watch` script
  - `test` is used by `npm test` script

When running building, environment variables are loaded from the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified env mode
.env.[mode].local   # only loaded in specified env mode, ignored by git
```

**Note:** only variables prefixed with `VITE_` are exposed to your code (e.g. `VITE_SOME_KEY=123`) and `SOME_KEY=123` will not.  you can access `VITE_SOME_KEY` using `import.meta.env.VITE_SOME_KEY`. This is because the `.env` files may be used by some users for server-side or build scripts and may contain sensitive information that should not be exposed in code shipped to browsers.



## Contribution

See [Contributing Guide](contributing.md).


[vite]: https://github.com/vitejs/vite/
[electron]: https://github.com/electron/electron
[electron-builder]: https://github.com/electron-userland/electron-builder
[typescript]: https://github.com/microsoft/TypeScript/
[spectron]: https://github.com/electron-userland/spectron
[react]: https://github.com/facebook/react
[cawa-93-github]: https://github.com/cawa-93/
[cawa-93-sponsor]: https://www.patreon.com/Kozack/
[wallaceosmar-github]: https://github.com/wallaceosmar/
[wallaceosmar-sponsor]: https://ko-fi.com/wallaceosmar