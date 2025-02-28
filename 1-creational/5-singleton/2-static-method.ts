import assert from 'assert'

class Singleton {
    private static instance: Singleton

    private constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton()
        }

        return Singleton.instance
    }
}

const o1 = Singleton.getInstance()
const o2 = Singleton.getInstance()

assert.equal(o1, o2)