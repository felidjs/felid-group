const Felid = require('felid')
const injectar = require('injectar')
const group = require('../src')

test('Should group apis', async () => {
  const instance = new Felid({ routePrefix: '' })
  instance.get('/test', (req, res) => {
    res.send('test')
  })
  instance.plugin(group)
  const v1 = instance.group('/v1')
  v1.get('/test', (req, res) => {
    res.send('v1test')
  })
  v1.get('/test2', (req, res) => {
    res.send('v1test2')
  })

  const inject = injectar(instance.lookup())
  let res
  res = await inject.get('/test').end()
  expect(res.payload).toBe('test')
  res = await inject.get('/v1/test').end()
  expect(res.payload).toBe('v1test')
  res = await inject.get('/v1/test2').end()
  expect(res.payload).toBe('v1test2')
})

test('Should set prefix according to parent', (done) => {
  const instance = new Felid({
    routePrefix: '/api'
  })
  instance.plugin(group)
  instance.group('/v1').get('/test', (req, res) => {
    res.send('test')
  })

  injectar(instance.lookup())
    .get('/api/v1/test')
    .end((err, res) => {
      expect(err).toBe(null)
      expect(res.payload).toBe('test')
      done()
    })
})

test('Should set prefix according to parent nestedly', (done) => {
  const instance = new Felid()
  instance.plugin(group)
  instance.group('/api').group('/v1').get('/test', (req, res) => {
    res.send('test')
  })

  injectar(instance.lookup())
    .get('/api/v1/test')
    .end((err, res) => {
      expect(err).toBe(null)
      expect(res.payload).toBe('test')
      done()
    })
})

test('Should append slash to the prefix which is not start with it', (done) => {
  const instance = new Felid()
  instance.plugin(group)
  instance.group('v1').get('/test', (req, res) => {
    res.send('test')
  })

  injectar(instance.lookup())
    .get('/v1/test')
    .end((err, res) => {
      expect(err).toBe(null)
      expect(res.payload).toBe('test')
      done()
    })
})

test('Should set custom decorator property name', (done) => {
  const instance = new Felid()
  instance.plugin(group, {
    decorator: {
      group: 'apis'
    }
  })
  instance.apis('/v1').get('/test', (req, res) => {
    res.send('test')
  })

  injectar(instance.lookup())
    .get('/v1/test')
    .end((err, res) => {
      expect(err).toBe(null)
      expect(res.payload).toBe('test')
      done()
    })
})

test('Should throw if prefix is undefined', (done) => {
  const instance = new Felid()
  instance.plugin(group)
  expect(() => {
    instance.group()
  }).toThrow()
  done()
})

test('Should throw if prefix is not a string', (done) => {
  const instance = new Felid()
  instance.plugin(group)
  expect(() => {
    instance.group(1)
  }).toThrow()
  done()
})

test('Should throw if prefix is an empty string', (done) => {
  const instance = new Felid()
  instance.plugin(group)
  expect(() => {
    instance.group('')
  }).toThrow()
  done()
})
