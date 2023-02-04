<div align="center">

# is-hidden-file

[![npm version](https://img.shields.io/badge/dynamic/json?color=317EFB&logo=npm&style=for-the-badge&label=Version&query=version&url=https%3A%2F%2Funpkg.com%2Fis-hidden-file%40latest%2Fpackage.json)](https://www.npmjs.com/package/@freik/is-hidden-file)

</div>

> Check if a file/folder is hidden on all platforms. Forked from
> [kimlimjustin/is-hidden-file](https://github.com/kimlimjustin/is-hidden-file)
> to use CMake (reliable!) instead of node-gyp (inscrutably broken constantly),
> with other fixes (like an obvious memory leak)

**Note** This will slow down your `yarn install`/`npm install`s, particularly on
Windows! The speed hit is unavoidable. Package managers are terrible at
understanding build dependencies, so they'll rebuild this whenever it gets
installed, even if nothing changed. And the rebuild invokes some platform
specific shim which is kind of slow. Once the shim is done, Linux and MacOS move
merrily on their way. Windows, however, invokes the cmake build system, followed
by the C++ compiler & linker, all of which is quite slow. The solution to this
is to get the NodeJS runtime to add support for this to the `path` or `fs`
modules...

- \*nix: Check file name starts with `.`.
- Windows: Check if file hidden using native code.

## Installation

- npm: `npm i is-hidden-file`
- yarn: `yarn add is-hidden-file`

## Usage

#### Node js

```js
const { isHiddenFile } = require('is-hidden-file');

console.log(isHiddenFile('.git')); // true
console.log(isHiddenFile('README.md')); // false
```

#### Node js with typescript

```ts
import { isHiddenFile } from 'is-hidden-file';

console.log(isHiddenFile('.git')); // true
console.log(isHiddenFile('README.md')); // false
```

## License

MIT
