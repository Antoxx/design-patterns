import assert from 'assert'

const singleton = ((instance: unknown) => () => instance)({})

const o1 = singleton()
const o2 = singleton()

assert.equal(o1, o2)