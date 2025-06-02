import EventEmitter from "events"

type Event = {
    name: string
}

interface IObserver {
    update (event: Event): void
}

class Observable extends EventEmitter {
    notify (event: Event) {
        this.emit(event.name, event)
        return this
    }
}

// Certain implementation

class ConsoleObserver implements IObserver {
    update (event: Event) {
        console.dir({ event })
    }
}

class EmailObserver implements IObserver {
    update (event: Event) {
        console.log(`Sending email about: ${JSON.stringify(event)}`)
    }
}

class NewObservable extends Observable {}

const consoleObserver = new ConsoleObserver()
const emailObserver = new EmailObserver()

const observable = new NewObservable()
observable.notify({ name: 'just created' })

const universalHandler = (event: Event) => {
    consoleObserver.update(event)
    emailObserver.update(event)
}

observable.on('observers added', universalHandler).on('finish', universalHandler)

observable.notify({ name: 'observers added' })
observable.notify({ name: 'finish' })

observable.off('observers added', universalHandler).off('finish', universalHandler)

observable.notify({ name: 'observers removed' })