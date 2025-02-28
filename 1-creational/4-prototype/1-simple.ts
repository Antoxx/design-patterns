import assert from 'assert'

class CloningProduct {
    name: string

    constructor (name: string) {
        this.rename(name)
    }

    rename (name: string) {
        this.name = name
    }

    clone () {
        return new CloningProduct(this.name)
    }
}

const product1 = new CloningProduct('First')

// cloning...
const product2 = product1.clone()

assert.equal(product1.name, product2.name)

product2.rename('Second')
assert.equal(product1.name, 'First')
assert.equal(product2.name, 'Second')