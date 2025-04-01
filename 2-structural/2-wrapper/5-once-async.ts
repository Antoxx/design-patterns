import assert from "assert"

const once = <T>(fn: (...args: any[]) => Promise<T>) => {
    let promise: Promise<T> = null
    return async (...args: any[]) => {
        if (!promise) {
            promise = fn(...args)
        }

        return promise
    }
}

let counter = 0

const fn = (): Promise<boolean> => {
    return new Promise((res) => {
        setTimeout(() => {
            counter++
            res(true)
        }, 100)
    })
}

const wrapped = once(fn)

await Promise.all([
    wrapped(),
    wrapped(),
    wrapped(),
])

assert.equal(counter, 1)

