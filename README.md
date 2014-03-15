## prettify-error

Prettify given error object

![](https://i.cloudup.com/y9mYC3b8t8.png)

## Install

```bash
$ npm install prettify-error
```

## Usage

```js
var prettify = require('prettify-error')
var err = new Error('lorem ipsum')

console.error(prettify(error))
```

If you'd like to skip some lines from the stack:

```js
prettify(error, 2) // Will start reading the stack from the third line.
```
