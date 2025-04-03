import assert from "assert"

class Person {
    firstName: string
    lastName: string

    constructor (firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }
}

class PersonProxy {
    person: Person
    
    constructor (person: Person) {
        this.person = person
    }

    get fullName () {
        return `${this.person.firstName} ${this.person.lastName}`
    }
}

const proxy = new PersonProxy(new Person('John', 'Smith'))

assert.equal(proxy.fullName, 'John Smith')
