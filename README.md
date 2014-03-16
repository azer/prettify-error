## prettify-error

Prettify given error objects for console outputs

![](https://i.cloudup.com/Vt6PAM3yDA.png)

## Install

```bash
$ npm install prettify-error
```

## Usage

```js
var prettify = require('prettify-error')
var err = new Error('lorem ipsum')

console.error(prettify(error) || error)
```

If you'd like to skip some lines from the stack:

```js
prettify(error, 2) // Will start reading the stack from the third line.
```
