abstract class Builder {
    abstract createProduct (): void
    abstract getProduct (): Product
    abstract step1 (): void
    abstract step2 (): void
    abstract step3 (): void
}

class ConcreteBuilder extends Builder {
    product: Product

    createProduct () {
        this.product = new Product()
    }

    getProduct () {
        return this.product
    }

    step1 (): void {
        this.product.addStep('Step 1')
    }

    step2 (): void {
        this.product.addStep('Step 2')
    }

    step3 (): void {
        this.product.addStep('Step 3')
    }
}

class Product {
    steps: string[] = []

    addStep (step: string) {
        this.steps.push(step)
    }
}

class Director {
    builder: Builder

    constructor (builder: Builder) {
        this.builder = builder
    }

    populateAscSteps () {
        const { builder } = this
        builder.createProduct()
        builder.step1()
        builder.step2()
        builder.step3()
        return builder.getProduct()
    }

    populateDescSteps () {
        const { builder } = this
        builder.createProduct()
        builder.step3()
        builder.step2()
        builder.step1()
        return builder.getProduct()
    }
}

const builder = new ConcreteBuilder()
const director = new Director(builder)

console.dir(director.populateAscSteps())
console.dir(director.populateDescSteps())
