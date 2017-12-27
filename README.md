
# detect-es

[![NPM version](https://img.shields.io/npm/v/detect-es.svg?style=flat)](https://npmjs.com/package/detect-es) [![NPM downloads](https://img.shields.io/npm/dm/detect-es.svg?style=flat)](https://npmjs.com/package/detect-es) [![CircleCI](https://circleci.com/gh/egoist/detect-es/tree/master.svg?style=shield)](https://circleci.com/gh/egoist/detect-es/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=flat)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat)](https://chat.egoist.moe)

> Detect ESnext features in your code.

⚠️  *Work In Progress.*

## Use cases

Prevent from shipping unexpected ES6 code to your users, and more...

## What's supported?

### Features

- [x] `const`
- [x] `let`
- [x] `template literal`
- [x] `tagged template literal`
- [x] `class`
- [x] `arrow function`
- [x] `async/await`
- [x] `es module`
- [x] `dynamic import`
- [x] `destructuring`
- [ ] `generator`
- [ ] `for..of`
- [ ] PR to add more...

### APIs

- [ ] `Object.assign`
- [ ] `Map` `Set` `WeakMap` `WeakSet`
- [ ] `Promise`
- [ ] `Proxy`
- [ ] PR to add more...

## Install

```bash
yarn global add detect-es
```

## CLI

```bash
detect-es foo.js
```

## API

```js
const detect = require('detect-es')

detect('const foo = {...bar}').then(file => {
  console.log(file.has('const'))
  // true
  console.log(file.has('object_rest_spread'))
  // true
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**detect-es** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/detect-es/contributors)).

> [egoist.moe](https://egoist.moe) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
