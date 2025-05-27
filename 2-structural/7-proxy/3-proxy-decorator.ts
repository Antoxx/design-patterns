class Person {
    firstName: string
    lastName: string

    constructor (firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
    }

    async activate () {
        // some actions
    }
}

class PersonProxy {
    person: Person
    
    constructor (person: Person) {
        this.person = person
    }

    async activate () {
        if (this.checkAccess()) {
            await this.person.activate()
            this.logActivation()
        }
    }

    private checkAccess () {
        // some checks
        return true
    }

    private logActivation () {
        console.log(`User was activated`)
    }
}

const proxy = new PersonProxy(new Person('John', 'Smith'))

await proxy.activate()
