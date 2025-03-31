class Timer {
    private counter = 0
    private resolve: Function | null = null
    private timeout: NodeJS.Timeout

    constructor (timeout: number) {
        this.timeout = setInterval(() => {
            if (this.resolve) {
                this.counter++
                this.resolve({
                    value: this.counter,
                    done: !this.timeout,
                })
            }
        }, timeout)
    }

    [Symbol.asyncIterator]() {
        const next = async () => new Promise((res) => {
            this.resolve = res
        })
        return { next: next as () => Promise<{ value: number, done: boolean }> }
    }

    stop() {
        clearInterval(this.timeout)
    }
}

const timer = new Timer(1000)

for await (const step of timer) {
    console.dir({ step })

    if (step >= 5) {
        timer.stop()
        console.log('STOPPED')
        break
    }
}

setTimeout(() => true, 1000)
