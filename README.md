# is-hidden-file

[Latest Version on NPM here](https://www.npmjs.com/package/@freik/is-hidden-file)

Check if a file/folder is hidden on all platforms.

> Forked from
> [kimlimjustin/is-hidden-file](https://github.com/kimlimjustin/is-hidden-file)
> to use CMake (reliable!) instead of node-gyp (inscrutably broken constantly
> for me), with other fixes (like an obvious memory leak)

_**Note** This will slow down your `yarn install`/`npm install`s, particularly
on Windows! The speed hit seems unavoidable. Package managers are terrible at
understanding build dependencies, so they'll rebuild this whenever it gets
installed, even if nothing changed. And the rebuild invokes some platform
specific shim which is kind of slow. Once the shim is done, Linux and MacOS move
merrily on their way. Windows, however, invokes the cmake build system, followed
by the C++ compiler & linker, all of which is quite slow. The solution to this
is to get the NodeJS runtime to add support for this to the `path` or `fs`
modules... It's gotten bad enough that I'm digging for solutions like including
pre-built x86 and AMD64 binaries in the NPM package..._

- On \*nix: Check file name starts with `.`.
- On Windows: Check if the file is hidden using native code.

## Installation

- npm: `npm i is-hidden-file`
- yarn: `yarn add is-hidden-file`

## Usage

It's packaged as both CJS and ESM: Use which module type your ecosystem
requires. Typescript types are also included.

### Node js with or without typescript

```ts
import { isHiddenFile } from 'is-hidden-file';
// Or this for CJS:
// const { isHiddenFile } = require('is-hidden-file');

console.log(isHiddenFile('.git')); // true
console.log(isHiddenFile('README.md')); // false
```

## License

MIT, cuz that's what the original was licensed with.
