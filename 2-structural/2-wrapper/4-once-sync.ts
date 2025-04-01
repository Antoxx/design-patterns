import assert from "assert"

let counter = 0

const once = (fn: Function) => {
    let result = false
    return (...args: any[]) => {
        if (result) {
            return
        }

        fn(...args)
        result = true
    }
}

const fn = () => counter++

const wrapped = once(fn)

wrapped()
wrapped()
wrapped()

assert.equal(counter, 1)