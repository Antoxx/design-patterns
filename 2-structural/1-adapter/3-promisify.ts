import assert from 'assert'
import { readFile } from 'fs'

const promisify = <T>(fn: Function) => (...args: any[]) => {
    return new Promise((resolve, reject) => {
        fn(...args, (error: Error, data: T) => {
            if (error) {
                reject(error)
            } else {
                resolve(data)
            }
        })
    })
}

const readFilePromise = promisify<string>(readFile)

const text = await readFilePromise('README.md', { encoding: 'utf-8' })
console.log(text)

try {
    await readFilePromise('unknown')
} catch (e: any) {
    assert.equal(e.code, 'ENOENT')
}

const text2 = await readFilePromise('unknown2').catch((e: any) => {
    assert.equal(e.code, 'ENOENT')
    return 'UNKNOWN'
})
assert.equal(text2, 'UNKNOWN')