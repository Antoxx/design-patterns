interface IProduct {
    name: string
    price: number
}

class Product implements IProduct {
    name: string
    private _price: number

    constructor (name: string, price: number) {
        this.name = name
        this._price = price
    }

    get price () {
        return this._price
    }
}

class Category implements IProduct {
    name: string
    private products: IProduct[]

    constructor (name: string, ...products: IProduct[]) {
        this.name = name
        this.products = products
    }

    get price () {
        return this.products.reduce((sum, p) => sum + p.price, 0)
    }
}

const croissant = new Product('croissant', 200)
const butter = new Product('butter', 200)
const coffee = new Product('coffee', 300)

const italianBreakfast = new Category('Italian breakfast', croissant, butter, coffee)

const bread = new Product('bread', 50)
const cheese = new Product('cheese', 450)
const wine = new Product('wine', 2000)

const italianLunch = new Category('Italian lunch', bread, cheese, wine)

const dayMeal = new Category('Day meal', italianBreakfast, italianLunch)

console.dir(italianBreakfast, { depth: null })
console.log(italianBreakfast.name)
console.log(italianBreakfast.price)

console.dir(italianLunch, { depth: null })
console.log(italianLunch.name)
console.log(italianLunch.price)

console.dir(dayMeal, { depth: null })
console.log(dayMeal.name)
console.log(dayMeal.price)