import assert from 'assert'

const Singleton = (() => {
    let instance: Singleton

    class Singleton {
        constructor () {
            if (instance) {
                return instance
            }

            instance = this
        }
    }

    return Singleton
})()

const o1 = new Singleton()
const o2 = new Singleton()

assert.equal(o1, o2)