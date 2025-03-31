interface ICustomEvent {
    step: number
}

class Timer extends EventTarget {
    private timeout: NodeJS.Timeout
    private counter = 0

    constructor (timeout: number) {
        super()

        this.timeout = setInterval(() => {
            this.counter++

            const event = new CustomEvent<ICustomEvent>('step', { 
                detail: { 
                    step: this.counter,
                },
            })

            this.dispatchEvent(event)
        }, timeout)
    }

    stop () {
        clearInterval(this.timeout)
    }
}

const timer = new Timer(1000)

const listener = (event: CustomEvent<ICustomEvent>) => {
    const step = event.detail.step
    console.dir({ step })

    if (step >= 5) {
        timer.removeEventListener('step', listener)
        timer.stop()
    }
}

timer.addEventListener('step', listener)