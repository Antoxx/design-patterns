import assert from "assert"

const data = {
    _age: 0,
    _birthday: '',
    firstName: 'John',
    lastName: 'Smith',
}

const calculatedKeys = ['age', 'fullName']

type TData = typeof data & { birthday: string, age: number, fullName: string }

function resolveAge (birthday: string) {
    return Math.floor((Date.now() - new Date(birthday).valueOf()) / (365 * 24 * 3600 * 1000))
}

function resolveKeys (obj: TData) {
    return [
        ...Reflect.ownKeys(obj).filter((key) => typeof key !== 'string' || !key.startsWith('_')),
        ...calculatedKeys,
        'birthday',
    ]
}

const proxy = new Proxy(data, {
    get (obj: TData, key: keyof TData) {
        // restrict getting of internal property value (security proxy)
        if (!resolveKeys(obj).includes(key)) {
            return undefined
        }

        if (key === 'fullName') {
            // lazy initialization (virtual proxy)
            return `${obj.firstName} ${obj.lastName}`
        }

        if (key === 'age') {
            if (!obj._birthday) {
                return 0
            }
    
            if (!obj._age) {
                // lazy initialization (virtual proxy)
                obj._age = resolveAge(obj._birthday)
            }
    
            return obj._age
        }

        if (key === 'birthday') {
            return obj._birthday
        }

        return obj[key]
    },
    set (obj: TData, key: keyof TData, val: string) {
        // restrict setting of internal or calculated property value (security proxy)
        if (key.startsWith('_') || calculatedKeys.includes(key)) {
            // silent
            return true
        }

        if (key === 'birthday') {
            // validation (security proxy)
            const age = resolveAge(val)
            if (age > 200) {
                // logging (logging proxy)
                console.log(`Error in setting of "Birthday"`)
                throw new Error(`A person's birthday is too far in the past: ${val}.`)
            }

            // logging (logging proxy)
            console.log(`"Birthday" was set successfully`)

            obj._age = age
            obj._birthday = val
            return true
        }

        obj[key] = val
        return true
    },
    has (obj: TData, key: keyof TData) {
        return resolveKeys(obj).includes(key)
    },
    ownKeys (obj: TData) {
        return resolveKeys(obj)
    },
    getOwnPropertyDescriptor (obj: TData, key: keyof TData) {
        const keys = resolveKeys(obj)
        if (!keys.includes(key)) {
            return
        }
        
        return {
            enumerable: true,
            configurable: true,
            writable: true,
            value: obj[key],
        }
    }
}) as TData

assert.equal('_age' in proxy, false)
assert.equal('age' in proxy, true)
assert.deepEqual(Object.keys(proxy), ['firstName', 'lastName', 'age', 'fullName', 'birthday'])
assert.deepEqual(Reflect.ownKeys(proxy), ['firstName', 'lastName', 'age', 'fullName', 'birthday'])
assert.equal(proxy.fullName, `John Smith`)

console.log(proxy.fullName)

proxy.birthday = '2000-01-01'

console.log(proxy.birthday)
console.log(proxy.age)
console.log(proxy._age)

assert.equal(proxy.birthday, '2000-01-01')
assert.equal(proxy.age, 25)
assert.equal(proxy._age, undefined)

proxy.age = 100
proxy._age = 150

assert.equal(proxy.birthday, '2000-01-01')
assert.equal(proxy.age, 25)
assert.equal(proxy._age, undefined)

try {
    proxy.birthday = '1800-01-01'
} catch (e: unknown) {
    console.error((e as Error).message)
}
        
console.log(proxy.birthday)
console.log(proxy.age)
console.log(proxy._age)

assert.equal(proxy.birthday, '2000-01-01')
assert.equal(proxy.age, 25)
assert.equal(proxy._age, undefined)

proxy.birthday = '2020-01-01'

console.log(proxy.birthday)
console.log(proxy.age)
console.log(proxy._age)

assert.equal(proxy.birthday, '2020-01-01')
assert.equal(proxy.age, 5)
assert.equal(proxy._age, undefined)