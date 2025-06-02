type Event = {
    name: string
}

interface IObserver {
    update (event: Event): void
}

class Observable {
    private observers = new Set<IObserver>()

    subscribe (observer: IObserver) {
        this.observers.add(observer)
        return this
    }

    unsubscribe (observer: IObserver) {
        this.observers.delete(observer)
        return this
    }

    notify (event: Event) {
        this.observers.forEach(o => o.update(event))
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

observable.subscribe(consoleObserver).subscribe(emailObserver)

observable.notify({ name: 'observers added' })
observable.notify({ name: 'finish' })

observable.unsubscribe(consoleObserver).unsubscribe(emailObserver)

observable.notify({ name: 'observers removed' })