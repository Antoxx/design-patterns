import assert from "assert"

const wrap = (fn: Function) => (...args: any[]) => {
    console.dir(args)
    return fn(...args)
}

const sum = (a: number, b: number) => a + b

const wrappedSum = wrap(sum)

assert.equal(wrappedSum(2, 3), 5)