import assert from "assert"
import { setTimeout as wait } from "timers/promises"

const throttle = (fn: Function, timeout: number) => {
    let timer: NodeJS.Timeout = null
    let fnArgs: any[]
    return (...args: any[]) => {
        fnArgs = args

        if (!timer) {
            timer = setTimeout(() => {
                fn(...fnArgs)
                clearTimeout(timer)
                timer = null
            }, timeout)
        }
    }
}

let result = ''
const fn = (str: string) => result += str

const throttled = throttle(fn, 100)

throttled('0')

await wait(200)

assert.equal(result, '0')

throttled('1')
throttled('2')

await wait(200)

assert.equal(result, '02')


throttled('3')
throttled('4')
throttled('5')

await wait(200)

assert.equal(result, '025')