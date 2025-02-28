abstract class Product {
    name: string

    constructor (name: string) {
        this.name = name
    }
}

abstract class ProductCreator {
    abstract factoryMethod (...args: unknown[]): Product
}

class Bread extends Product {}

class BreadCreator extends ProductCreator {
    factoryMethod (name: string) {
        return new Bread(name)
    }
}

const breadCreator = new BreadCreator()
console.dir(breadCreator.factoryMethod('Toast bread'))
