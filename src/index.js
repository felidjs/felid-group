const assert = require('assert')

function group (prefix) {
  assert.strictEqual(typeof prefix, 'string', 'prefix should be a string')
  assert.notStrictEqual(prefix, '', 'prefix should not be empty')
  prefix = normalizeRoutePrefix(prefix)
  if (this.routePrefix) {
    prefix = this.routePrefix + prefix
  }
  const instance = Object.create(this)
  instance.routePrefix = prefix
  return instance
}

function normalizeRoutePrefix (prefix) {
  return prefix.startsWith('/') || prefix.startsWith('*')
    ? prefix
    : '/' + prefix
}

const defaultDecoratorKeys = {
  group: 'group'
}

function plugin (felid, options = {}) {
  const decoratorKeys = {
    ...defaultDecoratorKeys,
    ...options.decorator
  }
  felid.decorate(decoratorKeys.group, () => group)
}

module.exports = plugin
