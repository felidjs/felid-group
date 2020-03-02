# felid-group

[![npm version](https://img.shields.io/npm/v/felid-group.svg)](https://www.npmjs.com/package/felid-group) [![Build Status](https://travis-ci.com/felidjs/felid-group.svg?branch=master)](https://travis-ci.com/felidjs/felid-group) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Add api for grouping routes in [Felid](https://github.com/felidjs/felid).

## Install

```bash
npm install felid-group
```

or

```bash
yarn add felid-group
```

## Usage

```javascript
const Felid = require('felid')
const group = require('felid-group')

const app = new Felid()
app.plugin(group, options)
const api = app.group('/api')
// /api/get
api.get('/get', (req, res) => {
  res.send('test')
}))
// /api/post
api.post('/post', (req, res) => {
  res.send('test')
}))
// make nested routing group: /api/v1/get
api.group('/v1').get('/get', (req, res) => {
  res.send('test')
}))
```

## Options

- **decorator** *Object*: Customize the decorator names. Default is:
```js
{
  group: 'group'
}
```

## API

- **felid.group(prefix: String) => Object**

## License

[MIT](./LICENSE)
