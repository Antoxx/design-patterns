import assert from 'assert'

class Queue extends Array {
    enqueue (val: unknown) {
        return this.push(val)
    }

    dequeue () {
        return this.pop()
    }
}

const queue = new Queue()
queue.enqueue('one')
queue.enqueue('two')

assert.equal(queue.length, 2)
assert.equal(queue.dequeue(), 'two')
assert.equal(queue.dequeue(), 'one')
assert.equal(queue.length, 0)