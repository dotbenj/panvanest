## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Reproduce the error

Once the app is started go to you browser at `http://localhost:3000/`
The error will pop in your terminal, something like this:

```
internal/modules/cjs/loader.js:1015
      throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
      ^

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /home/you/Documents/workspace/nestpanva/node_modules/jose/dist/node/esm/jwk/parse.js
require() of ES modules is not supported.
require() of /home/you/Documents/workspace/nestpanva/node_modules/jose/dist/node/esm/jwk/parse.js from /home/you/Documents/workspace/nestpanva/node_modules/oidc-provider/lib/helpers/keystore.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename parse.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from /home/you/Documents/workspace/nestpanva/node_modules/jose/package.json.

    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1015:13)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Module.require (internal/modules/cjs/loader.js:887:19)
    at require (internal/modules/cjs/helpers.js:74:18)
    at Object.<anonymous> (/home/you/Documents/workspace/nestpanva/node_modules/oidc-provider/lib/helpers/keystore.js:2:22)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14) {
  code: 'ERR_REQUIRE_ESM'
```
