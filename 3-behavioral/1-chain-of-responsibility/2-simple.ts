type Fn = (val: unknown, next: Function) => unknown

class Handler {
    fn: Fn
    next: Handler

    constructor (fn: Fn) {
        this.fn = fn
        this.next = null
    }
}

class Sender {
    private first: Handler
    private last: Handler

    add (fn: Fn) {
        const handler = new Handler(fn)

        if (!this.first) {
            this.first = handler
        } else {
            this.last.next = handler
        }

        this.last = handler
        
        return this
    }

    process (val: unknown) {
        let handler = this.first
        const tick = () => handler.fn(val, () => {
            handler = handler.next
            if (handler) {
                return tick()
            }
        })
        return tick()
    }
}

const sender = new Sender()
    .add((value, next) => {
        if (typeof value === 'number') {
            return value.toString()
        }
        return next()
    })
    .add((value, next) => {
        if (Array.isArray(value)) {
            return value.reduce((a, b) => a + b)
        }
        return next()
    })
    .add((value, next) => {
        if (typeof value === 'string') {
            return value + ' !!!!!!'
        }
        return next()
    })

{
  const result = sender.process(100)
  console.assert(result === '100', 'Result !== "100"')
}

{
  const result = sender.process([1, 2, 3])
  console.assert(result === 6, 'Result !== 6')
}