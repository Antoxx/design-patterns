import EventEmitter from 'events'

class LoggableEventEmitter extends EventEmitter {
    emit (eventName: string, eventArgs: any) {
        console.debug(`EventEmitter debug: "${eventName}"`)
        return super.emit(eventName, eventArgs)
    }
}

const eventEmitter = new LoggableEventEmitter()
eventEmitter.emit('some-event', [1, 2, 3])