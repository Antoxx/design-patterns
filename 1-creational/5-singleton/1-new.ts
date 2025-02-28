import assert from 'assert'

class Singleton {
    private static instance: Singleton

    constructor () {
        if (!Singleton.instance) {
            Singleton.instance = this
        }
        
        return Singleton.instance
    }
}

const o1 = new Singleton()
const o2 = new Singleton()

assert.equal(o1, o2)