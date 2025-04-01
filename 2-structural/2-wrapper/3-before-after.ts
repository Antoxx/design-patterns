import assert from "assert"

const wrap = (fn: Function, before: Function, after: Function) => (...args: any[]) => {
    return after(fn(...before(...args)))
}

const sum = (a: number, b: number) => a + b
const before = (...args: any[]) => {
    console.log(`Used arguments: ${JSON.stringify(args)}`)
    return args
}
const after = (res: any) => {
    console.log(`Calculated result: ${res}`)
    return res
}

const wrappedSum = wrap(sum, before, after)

assert.equal(wrappedSum(2, 3), 5)