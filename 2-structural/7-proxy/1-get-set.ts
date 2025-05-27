import assert from "assert"

const data = {
    firstName: 'John',
    lastName: 'Smith',

    // read-only property (security proxy)
    get fullName () {
        // lazy initialization (virtual proxy)
        return `${this.firstName} ${this.lastName}`
    },

    _birthday: '',
    get birthday () {
        return this._birthday
    },
    set birthday (val: string) {
        // validation (security proxy)
        const age = this.resolveAge(val)
        if (age > 200) {
            // logging (logging proxy)
            console.log(`Error in setting of "Birthday"`)
            throw new Error(`A person's birthday is too far in the past: ${val}.`)
        }

        // logging (logging proxy)
        console.log(`"Birthday" was set successfully`)

        this._age = age
        this._birthday = val
    },

    // read-only property (security proxy)
    _age: 0,
    get age () {
        if (!this._birthday) {
            return 0
        }

        if (!this._age) {
            // lazy initialization (virtual proxy)
            this._age = this.resolveAge(this._birthday)
        }

        return this._age
    },

    resolveAge (birthday: string) {
        return Math.floor((Date.now() - new Date(birthday).valueOf()) / (365 * 24 * 3600 * 1000))
    }
}

console.log(data.fullName)
assert.equal(data.fullName, `John Smith`)

data.birthday = '2000-01-01'

console.log(data.birthday)
console.log(data.age)

assert.equal(data.birthday, '2000-01-01')
assert.equal(data.age, 25)

try {
    data.birthday = '1800-01-01'
} catch (e: unknown) {
    console.error((e as Error).message)
}

console.log(data.birthday)
console.log(data.age)

assert.equal(data.birthday, '2000-01-01')
assert.equal(data.age, 25)

data.birthday = '2020-01-01'

console.log(data.birthday)
console.log(data.age)

assert.equal(data.birthday, '2020-01-01')
assert.equal(data.age, 5)
