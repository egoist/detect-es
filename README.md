
<h1 align="center">detect-es</h1>

<p align="center">Detect ESnext features in your code.</p>

<p align="center"><a href="https://npmjs.com/package/detect-es"><img src="https://img.shields.io/npm/v/detect-es.svg?style=flat" alt="NPM version"></a> <a href="https://npmjs.com/package/detect-es"><img src="https://img.shields.io/npm/dm/detect-es.svg?style=flat" alt="NPM downloads"></a> <a href="https://circleci.com/gh/egoist/detect-es/tree/master"><img src="https://circleci.com/gh/egoist/detect-es/tree/master.svg?style=shield" alt="CircleCI"></a>  <a href="https://github.com/egoist/donate"><img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat" alt="donate"></a> <a href="https://chat.egoist.moe"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=flat" alt="chat"></a></p>

<p align="center">
<img src="https://i.loli.net/2017/12/28/5a43c487ddb14.png" alt="preview">
</p>

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
- [x] `generator`
- [x] `for..of`
- [ ] PR to add more...

### APIs

- [x] `Object.assign`
- [x] `Map` `Set` `WeakMap` `WeakSet`
- [x] `Promise`
- [x] `Proxy`
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
const { parse }  = require('detect-es')

const stats = parse('const foo = {...bar}')
console.log(stats.has('const'))
// true
console.log(stats.has('object_rest_spread'))
// true
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
