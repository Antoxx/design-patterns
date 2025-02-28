import assert from 'assert'
import { deserialize, serialize } from 'v8'

class Product {
    name: string

    constructor (name: string) {
        this.rename(name)
    }

    rename (name: string) {
        this.name = name
    }
}

const product1 = new Product('First')

// cloning...
const product2 = deserialize(serialize(product1))
Object.setPrototypeOf(product2, Product.prototype)

assert.equal(product1.name, product2.name)

product2.rename('Second')
assert.equal(product1.name, 'First')
assert.equal(product2.name, 'Second')