import assert from 'assert'

const singleton = (() => {
    let instance = {}
    return () => instance
})()

const o1 = singleton()
const o2 = singleton()

assert.equal(o1, o2)