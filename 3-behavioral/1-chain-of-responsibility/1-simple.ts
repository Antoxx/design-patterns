class Handler<T> {
    private next: Handler<T> | null = null

    constructor (private fn: (val: T) => T) {}

    handle (val: T): T {
        let res = this.fn(val)

        if (this.next) {
            res = this.next.handle(res)
        }

        return res
    }

    setNext (next: Handler<T>) {
        this.next = next
        return next
    }
}

{
    const handler1 = new Handler<string>((val: string) => val)
    const res = handler1.handle('111')
    console.log(res)
    console.assert(res === '111', ' !== 111')
}

{
    const handler1 = new Handler<string>((val: string) => {
        console.log('Handler 1')
        return val + '4'
    })
    const handler2 = new Handler<string>((val: string) => {
        console.log('Handler 2')
        return val + '5'
    })
    const handler3 = new Handler<string>((val: string) => {
        console.log('Handler 3')
        return val + '6'
    })
    const handler4 = new Handler<string>((val: string) => {
        console.log('Handler 4')
        return val + '7'
    })
    const handler5 = new Handler<string>((val: string) => {
        console.log('Handler 5')
        return val + '8'
    })

    handler1.setNext(handler2).setNext(handler3).setNext(handler4).setNext(handler5)
    const result = handler1.handle('123')
    console.log(result)
    console.assert(result === '12345678', ' !== 12345678')
}
