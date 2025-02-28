import assert from 'assert'

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
const product2 = JSON.parse(JSON.stringify(product1))
Object.setPrototypeOf(product2, Product.prototype)

assert.equal(product1.name, product2.name)

product2.rename('Second')
assert.equal(product1.name, 'First')
assert.equal(product2.name, 'Second')